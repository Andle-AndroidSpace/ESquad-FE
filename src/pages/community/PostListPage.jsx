import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, List } from '@mui/material';
import { alpha, useTheme } from '@mui/material';
import PostCreationDialog from "../../components/content/community/PostCreationDialog.jsx";
import { Link } from "react-router-dom";

const PostListPage = ({ isSmallScreen }) => {
    const theme = useTheme();
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [teamId, setTeamId] = useState(1); // 임시로 팀 ID 설정, 필요 시 업데이트

    useEffect(() => {
        // 게시글 목록을 백엔드에서 가져오는 부분
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/questions');
                setPosts(response.data.content); // 페이징된 결과에서 content 사용
            } catch (err) {
                console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
            }
        };

        fetchPosts();
    }, []);

    const handleWriteButtonClick = () => {
        setIsPostModalOpen(true);
    };

    const handleClosePostModal = () => {
        setIsPostModalOpen(false);
    };

    return (
        <Box
            sx={{
                border: '1px solid',
                mb: 2,
                height: '100%',
                width: '100%',
                overflowX: 'auto',
                overflowY: 'auto',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2,
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: isSmallScreen ? 2 : 0,
                }}
            >
                <Button
                    variant="contained"
                    onClick={handleWriteButtonClick}
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        color: '#fff',
                        mr: 2,
                    }}
                >
                    글쓰기
                </Button>
            </Box>

            <List
                sx={{
                    width: '100%',
                    pr: 2,
                }}
            >
                {posts.map((post, index) => (
                    <Link
                        to={`/teams/${teamId}/questions/${post.id}`}
                        key={post.id}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <Box
                            sx={{
                                mb: 2,
                                borderBottom: '1px solid #ddd',
                                px: 2,
                                py: 2,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.light, 0.1),
                                    cursor: 'pointer',
                                },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: isSmallScreen ? 'center' : 'stretch',
                                justifyContent: isSmallScreen ? 'center' : 'flex-start'
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexDirection: isSmallScreen ? 'column' : 'row' }}>
                                <Button variant="outlined" size="small" disabled>{post.status || '미해결'}</Button>
                                <Typography variant="body1" fontWeight="bold">{post.title}</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: theme.palette.grey[700], mb: 1 }}>
                                {post.content.substring(0, 100)}...
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isSmallScreen ? 'column' : 'row', gap: isSmallScreen ? 1 : 0 }}>
                                <Typography variant="caption" color="text.secondary">{post.writerName} · {new Date(post.createdAt).toLocaleString()}</Typography>
                                <Box sx={{ display: 'flex', gap: 2, mt: isSmallScreen ? 1 : 0 }}>
                                    <Typography variant="caption">👍 {post.likes}</Typography>
                                    <Typography variant="caption">👁 {post.views || 0}</Typography>
                                    <Typography variant="caption">💬 {post.comments?.length || 0}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Link>
                ))}
            </List>

            {/* 글 작성 모달 */}
            <PostCreationDialog open={isPostModalOpen} onClose={handleClosePostModal} />
        </Box>
    );
};

export default PostListPage;
