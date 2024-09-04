import React, { createContext, useContext, useState } from 'react';

// Context 생성
const BookContext = createContext();

// Context Provider 컴포넌트
export const BookProvider = ({ children }) => {
    const [book, setBook] = useState(null); // 상태로 book 데이터를 관리

    return (
        <BookContext.Provider value={{ book, setBook }}>
            {children}
        </BookContext.Provider>
    );
};

// Context Consumer 훅
export const useBook = () => {
    return useContext(BookContext);
};