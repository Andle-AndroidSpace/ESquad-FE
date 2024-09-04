import { createContext, useContext, useState } from 'react';

// Context 생성
const BookContext = createContext();

// Context Provider 컴포넌트
export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]); // 상태로 book 데이터를 관리
    const [selectedBook, setSelectedBook] = useState([]);

    return (
        <BookContext.Provider value={{ books, setBooks, selectedBook, setSelectedBook }}>
            {children}
        </BookContext.Provider>
    );
};

// Context Consumer 훅
export const useBook = () => {
    return useContext(BookContext);
};


export default BookProvider