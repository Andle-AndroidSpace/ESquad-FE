import React, { useEffect, useState } from 'react';
import { useUser } from '/src/components/form/UserContext';
import {
    Box,
    Button,
    Typography,
    Card,
    CardContent,
    CardActions,
    Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchComponent from "../../components/team/SearchComponent.jsx";
import StudyCreatgionDialog from "../../components/team/StudyCreationDialog.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BookListPage = ({ isSmallScreen, isMediumScreen }) => {
    const params = useParams();
    const teamId = params.teamId;
    const theme = useTheme();
    const navigate = useNavigate();
    const { userInfo } = useUser();
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([
        {"id": 2, "isbn": '8012231', "title": '노인과 바다1', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 7, "isbn": '46821', "title": '노인과 바다2', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 94, "isbn": '5838', "title": '노인과 바다3', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 22, "isbn": '3dl328', "title": '노인과 바다4', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 19, "isbn": '855e25f23', "title": '노인과 바다5', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 127, "isbn": 'd55425d58', "title": '노인과 바다6', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 76, "isbn": '89432d1d8', "title": '노인과 바다7', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
        {"id": 99, "isbn": '052545', "title": '노인과 바다8', "writer": "kelin Macrke", "description": "책에 대한 소개소개소개소개소개소개소개소개", "publish": '샘샘', "src": "/src/assets/book-profile-man-and-sea.jpg"},
    ]);

    const handleStreamingButtonClick = (username) => {
        const popupUrl = `https://webrtc.store/esquad?name=${encodeURIComponent(username)}`;
        window.open(popupUrl, '_blank', 'width=800,height=600');
    };
    const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const handleWriteButtonClick = () => {
        setIsStudyModalOpen(true);
    };

    const handleCloseStudyModal = () => {
        setIsStudyModalOpen(false);
    };

    const handleSearch = (searchTerm) => {
        setQuery(searchTerm);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page); // 현재 페이지 상태 업데이트
        // 추가적인 로직 필요 (예: fetchBooks 호출 등)
    };
    useEffect(() => {
        const fetchBooks = async () => {
            if (!query) return;
            setLoading(true);
            try {
                const response = await axios.get(`/api/book/search?query=${query}`);
                setBooks(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        {books.map((study, index) => (console.log(study)))}
        fetchBooks();
    }, [query]);



    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mb: 3, gap: 2 }}>
                <SearchComponent
                    isMediumScreen={isMediumScreen}
                    isSmallScreen={isSmallScreen}
                    buttonVariant="contained"
                    placeholderText='새로운 스터디를 열 도서를 검색해보세요'
                    buttonBackgroundColor={theme.palette.primary.main}
                    onSearch={(query) => setQuery(query)}
                />
            </Box>
            {loading ? (
                <Typography variant="body1">로딩 중...</Typography>
            ) : (
                <Grid container spacing={3} sx={{ width: '100%', px: 2 }}>
                    {books.map((study, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card
                                onClick={() => navigate(`/teams/${params.teamId}/book/search/${study.isbn}`, { state: { study } })}
                                sx={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight="bold">
                                        {study.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.grey[700], mb: 2 }}>

                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        sx={{ color: theme.palette.primary.main }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStreamingButtonClick(userInfo.username);
                                        }}
                                    >
                                        스트리밍
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <StudyCreatgionDialog open={isStudyModalOpen} onClose={handleCloseStudyModal} />
            {/* Pagination */}
            <Box sx={{ width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', my: 3 }}>
                <Button variant="outlined" sx={{ mx: 1 }}>이전</Button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant="text" sx={{ mx: 1 }} onClick={() => handlePageChange(page)}>
                        {page}
                    </Button>
                ))}
                <Button variant="outlined" sx={{ mx: 1 }}>다음</Button>
            </Box>
        </>
    );
};

export default BookListPage;