// BookSearch.jsx
import { useState, useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { useBook } from './BookProvider.jsx';
import axios from 'axios'

const BookSearch = () => {

    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query') || '';

    const { books, setBooks, setSelectedBook } = useBook(); // Context에서 상태 관리
    const navigate = useNavigate();

    // 로딩 상태와 검색어 관리
    const [loading, setLoading] = useState(false);

    // 페이징 상태 관리
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(books.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = books.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        // 백엔드에서 데이터 가져오기
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/book/search?query=${query}`);
                console.log(response);
                setBooks(response.data);  // Assuming the book data is in response.data
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchBooks();
        } else {
            setBooks([]); // 검색어가 없으면 책 목록을 초기화
            setLoading(false);
        }
    }, [query, setBooks]);

    // 페이지 변환 관리
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 도서 선택 후 페이지 이동
    const handleBookClick = (book) => {
        setSelectedBook(book); // 선택된 책을 Context에 저장
        navigate(`/book/${book.isbn}`);
    };

    return (
        <div className="flex-1 p-4 bg-gray-900 text-white">
            {loading && <p>Loading...</p>}
            {!loading && books.length === 0 && (
                // eslint-disable-next-line react/no-unescaped-entities
                <h2 className="text-2xl font-bold mb-4">"{query}"에 대한 도서 정보가 없습니다.</h2>
            )}
            {books.length > 0 && (
                <>
                    {/*도서 리스트*/}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                        {currentItems.map((book) => (
                            <li
                                key={book.isbn}
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                                onClick={() => handleBookClick(book)}
                            >
                                <h1>{book.isbn}</h1>
                                <img src={book.image} alt={book.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                                    <p className="text-sm text-gray-400">by {book.author}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/* 페이징 처리 */}
                    <div className="flex justify-center space-x-2">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="flex items-center text-white">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default BookSearch;
