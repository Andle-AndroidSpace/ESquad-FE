import React, { useState, useEffect } from 'react';
import { useUser } from "/src/components/form/UserContext.jsx";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Grid, Box, Alert, CircularProgress } from '@mui/material';

const UserUpdate = () => {
    const { userInfo, refetch } = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
        address: ''
    });
    const [nicknameAvailable, setNicknameAvailable] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (userInfo) {
            setFormData({
                nickname: userInfo.nickname || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                birthDay: userInfo.birthDay || '',
                address: userInfo.address || ''
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleNicknameCheck = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8080/api/users/usernamecheck`, {
                params: { username: formData.nickname }
            });
            const { available } = response.data;
            setNicknameAvailable(available);
            setLoading(false);
            if (available) {
                alert("사용 가능한 닉네임입니다.");
            } else {
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error("닉네임 중복 체크 오류:", error);
            alert("닉네임 중복 체크에 실패했습니다.");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt');

        if (!token) {
            alert("로그인 후에 다시 시도해주세요.");
            return;
        }

        if (nicknameAvailable === false) {
            alert("중복된 닉네임이 있습니다. 다른 닉네임을 입력해주세요.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.put('http://localhost:8080/api/users/update', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            setSuccess(true);
            alert("회원 정보가 성공적으로 수정되었습니다!");
            await refetch();
            navigate("/user/profile");
        } catch (error) {
            setLoading(false);
            setError(error);
            if (error.response && error.response.status === 401) {
                alert("인증이 만료되었거나 잘못된 토큰입니다. 다시 로그인 해주세요.");
                localStorage.removeItem('jwt'); // 로그아웃 처리 (필요한 경우)
            } else {
                alert(`회원 정보 수정에 실패했습니다. 오류: ${error.response?.status || "알 수 없는 오류"}`);
            }
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, p: 4, borderRadius: 2, boxShadow: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    회원정보 수정
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                id="username"
                                label="아이디"
                                value={userInfo?.username || ''}
                                variant="outlined"
                                fullWidth
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="nickname"
                                label="닉네임"
                                value={formData.nickname}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNicknameCheck}
                                sx={{ mt: 2, display: 'block', mx: 'auto' }}
                            >
                                닉네임 중복 체크
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="email"
                                label="이메일"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="phoneNumber"
                                label="연락처"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="birthDay"
                                label="생년월일"
                                type="date"
                                value={formData.birthDay}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address"
                                label="주소"
                                value={formData.address}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            component={Link}
                            to="/user/profile"
                        >
                            취소
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            회원정보 수정
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default UserUpdate;
