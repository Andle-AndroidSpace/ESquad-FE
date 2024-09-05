// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import Join from "./pages/join/Join";
import Login from "./pages/login/Login";

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/join" element={<Join />} />
                <Route path="*" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
