import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button, InputBase, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import { ThumbUp } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '/src/components/form/UserContext';

const PostDetailsPage = () => {
    const theme = useTheme();
    const { postId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useUser();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/${postId}`);
                setPost(response.data);
                setLikes(response.data.likes);
            } catch (error) {
                console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/questions/${postId}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error("댓글을 불러오는 중 오류가 발생했습니다:", error);
            }
        };

        fetchPost();
        fetchComments();
    }, [postId]);

    const handleLike = async () => {
        try {
            await axios.post(`http://localhost:8080/api/questions/${postId}/like`);
            setLikes((prevLikes) => isLiked ? prevLikes - 1 : prevLikes + 1);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("좋아요 처리 중 오류가 발생했습니다:", error);
        }
    };

    const handleCommentSubmit = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:8080/api/questions/${postId}/comments`, {
                content: newComment,
            });
            setComments([...comments, response.data]);
            setNewComment('');
        } catch (error) {
            console.error("댓글 작성 중 오류가 발생했습니다:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/teams/1/questions/${postId}/edit`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            const response = await axios.delete(`http://localhost:8080/api/questions/${postId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });
            if (response.status === 200 || response.status === 204) {
                alert("게시글이 삭제되었습니다.");
                navigate("/teams/1/questions");
            } else {
                console.error("게시글 삭제 요청이 성공적으로 처리되지 않았습니다.");
            }
        } catch (error) {
            console.error("게시글 삭제 중 오류가 발생했습니다:", error);
        }
    };

    if (!post) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Button onClick={() => navigate(`/teams/1/questions`)} variant="text" sx={{ mb: 2 }}>
                &larr; 뒤로가기
            </Button>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography variant="h5" fontWeight="bold">
                        {post.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        작성자: {userInfo.username} · {new Date(post.createdAt).toLocaleString()} · 조회수: {post.views || 0}
                    </Typography>
                </Box>
                <Box>
                    <Button variant="outlined" onClick={handleEdit} sx={{ mr: 1 }}>
                        수정
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleDelete}>
                        삭제
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            {/* 이미지 표시 */}
            {post.imageUrl && (
                <Box sx={{ mb: 3 }}>
                    <img src={post.imageUrl} alt="게시글 이미지" style={{ maxWidth: '100%', borderRadius: 8 }} />
                </Box>
            )}

            <Box sx={{ mb: 4 }}>
                <Typography variant="body1">{post.content}</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <IconButton onClick={handleLike} color={isLiked ? "primary" : "default"}>
                    <ThumbUp />
                </IconButton>
                <Typography>{likes}명이 좋아합니다</Typography>
            </Box>

            <Box>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                    답변 {comments.length}
                </Typography>
                <InputBase
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 작성해보세요..."
                    fullWidth
                    sx={{
                        mb: 2,
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 1,
                    }}
                />
                <Button
                    onClick={handleCommentSubmit}
                    variant="contained"
                    sx={{ mb: 3, backgroundColor: theme.palette.primary.main }}
                >
                    댓글 작성
                </Button>
                <Divider sx={{ mb: 3 }} />

                {comments.map((comment, index) => (
                    <Box key={index} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="body1" fontWeight="bold">
                                {comment.writer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {new Date(comment.createdAt).toLocaleString()}
                            </Typography>d
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {comment.content}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                            <Typography variant="caption">👍 {comment.likes}</Typography>
                            <Typography variant="caption">답글</Typography>
                        </Box>
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default PostDetailsPage;
