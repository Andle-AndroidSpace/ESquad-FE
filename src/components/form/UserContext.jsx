import React, { createContext, useContext, useEffect, useState } from 'react';
import useAxios from '/src/hooks/useAxios.jsx'; // 커스텀 훅 사용

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);

    // 커스텀 useAxios 훅을 사용하여 사용자 정보를 가져옴
    const { data, error, loading, refetch } = useAxios({
        url: 'http://localhost:8080/api/users/inquiry',
        method: 'GET',
    });

    useEffect(() => {
        // 로컬 스토리지에서 사용자 정보 불러오기
        const savedUserInfo = localStorage.getItem("userInfo");
        if (savedUserInfo) {
            setUserInfo(JSON.parse(savedUserInfo));
        }
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행

    useEffect(() => {
        if (data) {
            setUserInfo(data.data); // 데이터가 있을 때만 사용자 정보 업데이트
            localStorage.setItem("userInfo", JSON.stringify(data.data)); // 로컬 스토리지에 사용자 정보 저장
        }
        if (error) {
            console.error('사용자 정보를 불러오는 중 오류가 발생했습니다:', error);
        }
    }, [data, error]);

    const clearUserInfo = () => {
        setUserInfo(null); // 사용자 정보 초기화
        localStorage.removeItem('jwt'); // JWT 토큰 삭제
        localStorage.removeItem('userInfo'); // 로컬 스토리지에서 사용자 정보 삭제
    };

    return (
        <UserContext.Provider value={{ userInfo, refetch, clearUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};
