import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const PasswordUpdate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt');

        if (!token) {
            alert('로그인 후에 시도해주세요.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:8080/api/users/password',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다!');
                navigate('/user/profile');
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('인증이 만료되었습니다. 다시 로그인해주세요.');
                localStorage.removeItem('jwt');
                navigate('/login');
            } else {
                alert(`비밀번호 변경에 실패했습니다.`);
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ backgroundColor: '#ffffff', padding: 4, borderRadius: 2, boxShadow: 3, mt: 8 }}>
            <Typography variant="h5" component="h2" align="center" gutterBottom>
                비밀번호 변경
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    id="currentPassword"
                    label="현재 비밀번호"
                    type="password"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />
                <TextField
                    id="newPassword"
                    label="새 비밀번호"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    required
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => navigate('/user/profile')}
                        fullWidth
                        sx={{ mr: 2 }}
                    >
                        취소
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        비밀번호 변경
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default PasswordUpdate;
