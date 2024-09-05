import { useState, useEffect } from 'react';

const BookRecognize = () => {

    // 추천 책 저장
    const [similarBooks, setSimilarBooks] = useState([]);
    const [authorBooks, setAuthorBooks] = useState([]);
    const [publisherBooks, setPublisherBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 1: similar books, 2: author books, 3: publisher books

    // 더미 데이터
    useEffect(() => {
        const mockSimilarBooks = [
            { title: 'Similar Book 1', link: '/book/1' },
            { title: 'Similar Book 2', link: '/book/2' },
            { title: 'Similar Book 3', link: '/book/3' }
        ];

        const mockAuthorBooks = [
            { title: 'Author Book 1', link: '/book/6' },
            { title: 'Author Book 2', link: '/book/7' },
            { title: 'Author Book 3', link: '/book/8' }
        ];

        const mockPublisherBooks = [
            { title: 'Publisher Book 1', link: '/book/10' },
            { title: 'Publisher Book 2', link: '/book/11' },
            { title: 'Publisher Book 3', link: '/book/12' }
        ];

        setSimilarBooks(mockSimilarBooks);
        setAuthorBooks(mockAuthorBooks);
        setPublisherBooks(mockPublisherBooks);
    }, []);

    // 페이지 마다 바뀌는 값
    const renderBooks = () => {
        let books = [];
        let title = '';

        if (currentPage === 1) {
            books = similarBooks;
            title = '비슷한 주제의 책';
        } else if (currentPage === 2) {
            books = authorBooks;
            title = '같은 저자의 책';
        } else if (currentPage === 3) {
            books = publisherBooks;
            title = '같은 출판사의 책';
        }

        return (
            <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <ul className="list-disc pl-5">
                    {books.map((book, index) => (
                        <li key={index}>
                            <a href={book.link} className="text-blue-500 hover:underline">
                                {book.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
            {/* Recommended Books Section */}
            <div className="mt-6">
                {/* 추천 도서 랜더링 */}
                {renderBooks()}

                {/* 페이징 */}
                <div className="mt-4 flex justify-center space-x-4">
                    {[1, 2, 3].map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 py-2 rounded ${
                                currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookRecognize;
