import React from 'react';
import LoginForm from '../../components/form/LoginForm';
import { Box, Container, Grid, Hidden } from '@mui/material';

const Login = ({ setIsLoggedIn }) => {
    return (
        <Box display="flex" width="100%" height="100vh">
            <Grid container>
                <Grid
                    item
                    xs={12}
                    lg={6}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Container maxWidth="sm">
                        <LoginForm setIsLoggedIn={setIsLoggedIn} />
                    </Container>
                </Grid>
                <Hidden lgDown>
                    <Grid
                        item
                        lg={6}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            backgroundColor: 'grey.200',
                            position: 'relative',
                            height: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                width: 240,
                                height: 240,
                                background: 'linear-gradient(to top right, #8b5cf6, #ec4899)',
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
                </Hidden>
            </Grid>
        </Box>
    );
};

export default Login;
