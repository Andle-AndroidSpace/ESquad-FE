import React, { useState, useEffect } from 'react';
import {Routes, Route, Navigate, BrowserRouter} from 'react-router-dom';
import Home from "./pages/home/Home.jsx";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import StudyPage from "./pages/team/StudyPage.jsx";
import { UserProvider } from '/src/components/form/UserContext.jsx'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './index.css';
import PostListPage from "./pages/community/PostListPage.jsx";
import StudyListPage from "./pages/team/StudyListPage.jsx";
import BookListPage from "./pages/team/BookListPage.jsx";
import BookDetailPage from "./pages/team/BookDetailPage.jsx";
import StudyDetailPage from "./pages/team/StudyDetailPage.jsx";
import UserProfile from "./components/user/UserProfile.jsx"

const theme = createTheme({
    palette: {
        primary: {
            main: '#9f51e8', // Home color
            light: '#ac71e5',
        },
        secondary: {
            main: '#0095ff', // Emphasis color
        },
        warning: {
            main: '#f51738',
        },
        background: {
            default: '#F0F0F0', // Background color
            paper: '#FFFFFF', // Sub color for cards
            gray: '#e0dddd',
        },
    },
    typography: {
        fontFamily: 'AppleSDGothicNeo, Noto Sans KR, sans-serif',
    },
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);      // 0: 커뮤니티, 1: 팀

    // 페이지가 로드되었을 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
    // useEffect(() => {
    //     const token = localStorage.getItem('jwt');
    //     if (token) {
    //         setIsLoggedIn(true);
    //     }
    // }, []);
    //
    //
    // const ProtectedRoute = ({ children }) => {
    //     const token = localStorage.getItem('jwt');
    //     if (!token) {
    //         return <Navigate to="/login" />;
    //     }
    //     return children;
    // };
    //
    //
    // const RedirectIfLoggedIn = ({ children }) => {
    //     const token = localStorage.getItem('jwt');
    //     if (token) {
    //         return <Navigate to="/" />;
    //     }
    //     return children;
    // };

    return (
        <ThemeProvider theme={theme}>
            {/*<UserProvider>*/}
            <BrowserRouter>
                {/*<Routes>*/}
                {/*Redirect logged-in users away from the login page */}
                {/*<Route path="/login" element={<RedirectIfLoggedIn><Login setIsLoggedIn={setIsLoggedIn} /></RedirectIfLoggedIn>} />*/}
                {/*<Route path="/join" element={<Join />} />*/}

                {/*Protect routes that require authentication */}
                {/*<Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} />*/}
                {/*</Routes>*/}
                <Routes>

                    <Route path="/" element={<Home/>} >

                        <Route path="/user/profile" element={<UserProfile/>} />

                        <Route path="community/questions" element={<PostListPage/>} />
                        {/*<Route path="community/general" element={<PostListPage/>} />/*/}
                        {/*<Route path="community/team-recruit" element={<PostListPage/>} />*/}

                        <Route path="teams/:teamId" element={<StudyPage />} >
                            <Route path="study" exact element={<StudyListPage />} />
                            <Route path="study/:studyId" exact element={<StudyDetailPage />} />
                            <Route path="book/search" exact element={<BookListPage />} />
                            <Route path="book/search/:bookId" element={<BookDetailPage />} />
                            <Route path="questions" element={<StudyPage />} />
                        </Route>

                    </Route>
                </Routes>
            </BrowserRouter>
            {/*</UserProvider>*/}
        </ThemeProvider>
    );
}


export default App
