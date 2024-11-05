import React, {useEffect, useState} from 'react';
import { useUser } from '/src/components/form/UserContext';
import {
    Box,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    CardActions,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchComponent from "../../components/team/SearchComponent.jsx";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const StudyListPage = ({ isSmallScreen, isMediumScreen }) => {
    const theme = useTheme();
    const params = useParams();
    const navigate = useNavigate();
    const teamId = params.teamId;
    const [studys, setStudys] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [error, setError] = useState(false); // 에러 상태 관리

    const { userInfo } = useUser();
    const handleStreamingButtonClick = (username) => {
        const popupUrl = `https://webrtc.store/esquad?name=${encodeURIComponent(username)}`;
        window.open(popupUrl, '_blank', 'width=800,height=600');
    };

    useEffect(() => {
        const fetchStudies = async () => {
            try {
                const response = await axios.get(`/api/${teamId}/study-pages`); // 팀 ID를 기반으로 데이터 가져오기
                setStudys(response.data); // 가져온 데이터를 상태에 저장
            } catch (err) {
                console.error(err);
                setError(true); // 에러 발생 시 상태 업데이트
            } finally {
                setLoading(false); // 로딩 종료
            }
        };

        fetchStudies(); // 컴포넌트 마운트 시 데이터 가져오기
    }, [teamId]); // teamId가 변경될 때마다 데이터 fetch

    if (loading) return <p>Loading...</p>; // 로딩 중 표시
    if (error) return <p>Error loading studies.</p>; // 에러 발생 시 표시

    {studys.map((study, index) => (console.log(study)))}

    return (
        <>
            {/* Filters and Search */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 3,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Button variant="text" sx={{ fontSize: 'medium', fontWeight: 'bold', borderBottom: '2px solid', borderColor: theme.palette.primary.main }}>
                        전체
                    </Button>
                    <Button variant="text" sx={{ fontSize: 'medium' }}>
                        진행중
                    </Button>
                    <Button variant="text" sx={{ fontSize: 'medium' }}>
                        종료
                    </Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 2,
                        width: '90%',
                    }}
                >
                    <SearchComponent
                        isSmallScreen={isSmallScreen}
                        isMediumScreen={isMediumScreen}
                        placeholderText='찾아보고픈 스터디가 있나요?'
                        buttonBackgroundColor={theme.palette.primary.main}
                        buttonVariant='contained'
                    />
                </Box>
            </Box>

            {/* Posts List as Cards in a Grid */}
            <Grid container spacing={3} sx={{ width: '100%', px: 2 }}>
                {studys.map((study, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            button
                            onClick={() =>
                                navigate(`/teams/${params.teamId}/study/${study.id}`, {
                                    state: { study }
                                })
                            }
                            sx={{
                                cursor: 'pointer',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2,
                                    }}
                                >
                                    <Typography variant="h6" fontWeight="bold">
                                        {study.title}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                    <img src={study.image} alt="Study" style={{ maxWidth: '100%', borderRadius: 4 }} />
                                </Box>
                                {/*<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>*/}
                                {/*    {['react-native', 'typescript', 'nestjs', 'react-query', 'zustand'].map(*/}
                                {/*        (tag, idx) => (*/}
                                {/*            <Button key={idx} variant="outlined" size="small" sx={{ borderRadius: 4, fontSize: '0.7rem' }}>*/}
                                {/*                {tag}*/}
                                {/*            </Button>*/}
                                {/*        )*/}
                                {/*    )}*/}
                                {/*</Box>*/}
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

            {/* Pagination */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    my: 3,
                }}
            >
                <Button variant="outlined" sx={{ mx: 1 }}>
                    이전
                </Button>
                {[1, 2, 3, 4, 5].map((page) => (
                    <Button key={page} variant="text" sx={{ mx: 1 }}>
                        {page}
                    </Button>
                ))}
                <Button variant="outlined" sx={{ mx: 1 }}>
                    다음
                </Button>
            </Box>
        </>
    );
};

export default StudyListPage;
