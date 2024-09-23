import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import { UserProvider } from '/src/components/form/UserContext.jsx'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 페이지가 로드되었을 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    const ProtectedRoute = ({ children }) => {
        const token = localStorage.getItem('jwt');
        if (!token) {
            return <Navigate to="/login" />;
        }
        return children;
    };


    const RedirectIfLoggedIn = ({ children }) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    {/* Redirect logged-in users away from the login page */}
                    <Route path="/login" element={<RedirectIfLoggedIn><Login setIsLoggedIn={setIsLoggedIn} /></RedirectIfLoggedIn>} />
                    <Route path="/join" element={<Join />} />

                    {/* Protect routes that require authentication */}
                    <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} /></Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
