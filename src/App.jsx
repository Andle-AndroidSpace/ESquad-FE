import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";
import FindUsername from "./components/form/FindUsername.jsx"
import FindPassword from "./components/form/FindPassword.jsx"
import { UserProvider } from '/src/components/form/Inquiry.jsx'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                    <Route path="/login" element={<RedirectIfLoggedIn><Login setIsLoggedIn={setIsLoggedIn} /></RedirectIfLoggedIn>} />
                    <Route path="/join" element={<Join />} />
                    <Route path="/find-username" element={<FindUsername />} />
                    <Route path="/find-password" element={<FindPassword />} />
                    <Route path="*" element={<ProtectedRoute><Home /></ProtectedRoute>} /></Routes>
            </BrowserRouter>
        </UserProvider>
    );
};

export default App;
