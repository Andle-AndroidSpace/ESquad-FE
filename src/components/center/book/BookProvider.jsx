import { createContext, useContext, useState } from 'react';

// Context 생성
const BookContext = createContext();

// Context Provider 컴포넌트
export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]); // 상태로 book 데이터를 관리
    const book = localStorage.getItem('selectedBook')
    const [selectedBook, setSelectedBook] = useState(book||[]);
    return (
        <BookContext.Provider value={{ books, setBooks, selectedBook, setSelectedBook }}>
            {children}
        </BookContext.Provider>
    );
};

// Context
export const useBook = () => {
    return useContext(BookContext);
};


export default BookProvider