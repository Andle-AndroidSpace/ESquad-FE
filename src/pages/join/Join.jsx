// src/components/Join.jsx
import React from 'react';
import JoinForm from '../../components/form/JoinForm';
import { Box, Grid, Paper, Typography } from '@mui/material';

const Join = () => {
    return (
        <Grid container sx={{ height: '100vh' }}>
            {/* Background Section */}
            <Grid
                item
                xs={false}
                lg={6}
                sx={{
                    display: { xs: 'none', lg: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.200',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        width: 240,
                        height: 240,
                        background: 'linear-gradient(to top right, #7c4dff, #ff4081)',
                        borderRadius: '50%',
                        animation: 'bounce 2s infinite',
                    }}
                />
                <Box
                    sx={{
                        width: '100%',
                        height: '50%',
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                    }}
                />
            </Grid>

            {/* Form Section */}
            <Grid
                item
                xs={12}
                lg={6}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                }}
            >
                <JoinForm />
            </Grid>
        </Grid>
    );
};

export default Join;