import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, InputBase, Chip, TextField, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import { Autocomplete } from '@mui/material';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUser } from '/src/components/form/UserContext'; // 사용자 정보 사용
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅

const PostCreationPage = ({ onCancel }) => {
    const theme = useTheme();
    const navigate = useNavigate(); // 페이지 이동을 위한 훅 선언
    const { userInfo } = useUser(); // 사용자 정보 가져오기
    const [activeTab, setActiveTab] = useState('질문');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        const uploadedFile = event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleFileDelete = () => {
        setFile(null);
    };

    const handleSubmit = async () => {
        if (!userInfo) {
            console.error("사용자 정보가 없습니다. 로그인 후 다시 시도해주세요.");
            return;
        }

        if (!title || !content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('username', userInfo.username); // 사용자 이름 설정
            formData.append('bookId', 1); // 임시 값, 실제 데이터를 받아서 변경 필요
            formData.append('teamSpaceId', 1); // 임시 값, 실제 데이터를 받아서 변경 필요
            if (file) {
                formData.append('file', file);
            }

            const response = await axios.post('http://localhost:8080/api/questions', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201 || response.status === 200) {
                const newPostId = response.data.id; // 생성된 게시글의 ID
                const teamSpaceId = response.data.teamSpaceId; // 생성된 팀 ID
                navigate(`/teams/${teamSpaceId}/questions/${newPostId}`); // 상세 페이지로 이동
            }
        } catch (error) {
            console.error("게시글 생성 중 오류가 발생했습니다:", error);
            if (error.response) {
                console.error("서버 응답 오류:", error.response.data);
                alert(`게시글 생성에 실패했습니다: ${error.response.data.message || '알 수 없는 오류'}`);
            } else {
                alert("게시글 생성에 실패했습니다. 다시 시도해주세요.");
            }
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2,
                maxWidth: '650px',  // 모달 창 가로 너비 고정
                height: '80vh',      // 모달 창 세로 너비 고정 (전체 뷰포트의 80%)
                mx: 'auto',
                my: 'auto',
                py: 2,
            }}
        >
            {/* 탭 메뉴 */}
            <Box sx={{ display: 'flex', gap: 3, mb: 2, borderBottom: `1px solid ${theme.palette.primary.light}` }}>
                {['질문', '고민있어요', '스터디'].map((tab) => (
                    <Button
                        key={tab}
                        variant="text"
                        onClick={() => setActiveTab(tab)}
                        sx={{
                            fontSize: 'large',
                            fontWeight: activeTab === tab ? 'bold' : 'normal',
                            borderBottom: activeTab === tab ? '2px solid' : 'none',
                            borderColor: activeTab === tab ? theme.palette.primary.main : 'transparent',
                        }}
                    >
                        {tab}
                    </Button>
                ))}
            </Box>

            {/* 제목 입력 필드 */}
            <Box sx={{ mb: 2 }}>
                <InputBase
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={activeTab === '질문' ? '제목에 핵심 내용을 요약해보세요.' : activeTab === '고민있어요' ? '어떤 고민이 있으신가요?' : '스터디 제목을 입력하세요.'}
                    fullWidth
                    sx={{
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        p: 1,
                        borderBottom: '1px solid #ccc',
                    }}
                />
            </Box>

            {/* 태그 입력 필드 */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ px: 1 }}>
                    태그를 설정하세요 (최대 10개)
                </Typography>
                <Autocomplete
                    multiple
                    freeSolo
                    options={[]}
                    value={tags}
                    onChange={(event, newValue) => setTags(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" size='small' label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            size="small"
                            variant="standard"
                            placeholder="입력 후 엔터키를 누르면 태그가 생성됩니다."
                            sx={{ width: '100%', p: 1 }}
                        />
                    )}
                />
            </Box>

            {/* 내용 입력 필드 */}
            <Box>
                <InputBase
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={activeTab === '질문' ? '학습 관련 질문을 남겨주세요. 상세히 작성하면 더 좋아요!' : activeTab === '고민있어요' ? '고민 내용을 입력하세요' : '스터디 설명을 입력하세요'}
                    multiline
                    minRows={10}
                    fullWidth
                    sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                    }}
                />
            </Box>

            {/* 파일 첨부 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<AttachFileIcon />}
                    sx={{ backgroundColor: theme.palette.primary.main, color: '#fff' }}
                >
                    파일 첨부
                    <input type="file" hidden onChange={handleFileUpload} />
                </Button>
                {file && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2">{`${file.name} (${(file.size / 1024).toFixed(2)} KB)`}</Typography>
                        <IconButton onClick={handleFileDelete} size="small">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>

            {/* 등록/취소 버튼 */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                    variant="contained"
                    onClick={onCancel}
                    sx={{ color: '#fff', backgroundColor: theme.palette.warning.main, px: 4 }}
                >
                    취소
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: theme.palette.primary.main, color: '#fff', px: 4 }}
                >
                    등록
                </Button>
            </Box>
        </Box>
    );
};

export default PostCreationPage;
