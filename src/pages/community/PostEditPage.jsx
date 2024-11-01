import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const PostEditPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // 기존 게시글 내용을 불러오기
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/${postId}`);
                setTitle(response.data.title);
                setContent(response.data.content);
            } catch (error) {
                console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchPost();
    }, [postId]);

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/api/questions/${postId}`, {
                title,
                content
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`, // 인증 헤더 추가
                },
            });
            alert("게시글이 수정되었습니다.");
            navigate(`/teams/1/questions/${postId}`); // 수정 후 상세 페이지로 이동
        } catch (error) {
            console.error("게시글 수정 중 오류가 발생했습니다:", error);
        }
    };

    const handleCancel = () => {
        navigate(`/teams/1/questions/${postId}`); // 취소 버튼 클릭 시 상세 페이지로 이동
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>게시글 수정</Typography>
            <TextField
                label="제목"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                label="내용"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                    수정 완료
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                    취소
                </Button>
            </Box>
        </Box>
    );
};

export default PostEditPage;
