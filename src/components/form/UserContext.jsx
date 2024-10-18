import React, { createContext, useContext, useEffect, useState } from 'react';
import useAxios from '/src/hooks/useAxios.jsx'; // 커스텀 훅 사용

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);


    const { data, error, loading, refetch } = useAxios({
        url: 'http://localhost:8080/api/users/inquiry',
        method: 'GET',
    });

    useEffect(() => {
        if (data) {
            setUserInfo(data.data);
        }
        if (error) {
            console.error('사용자 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
    }, [data, error]);

    const clearUserInfo = () => {
        setUserInfo(null);
        localStorage.removeItem('jwt');
    };

    return (
        <UserContext.Provider value={{ userInfo, refetch, clearUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
