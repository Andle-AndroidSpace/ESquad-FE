import { useState, useEffect } from 'react';import { Link, useLocation } from 'react-router-dom';

const Search = () => {
   const location = useLocation();
   const query = new URLSearchParams(location.search).get('query') || '';

    // State for books and loading status
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // 백엔드에서 데이터 가져오기
    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/book/search?query=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setBooks(data);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchBooks();
        } else {
            setBooks([]);
            setLoading(false);
        }
    }, [query]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(books.length / itemsPerPage);

    // Get current page items
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = books.slice(startIndex, startIndex + itemsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex-1 p-4 bg-gray-900 text-white">
            {loading && <p>Loading...</p>}
            {!loading && books.length === 0 && (
                <h2 className="text-2xl font-bold mb-4">"{query}"에 대한 도서 정보가 없습니다.</h2>
            )}
            {books.length > 0 && (
                <>
                    {/*도서 리스트*/}
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                        {currentItems.map((book) => (
                            <li key={book.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                <Link to={`/books/${book.isbn}`} className="block">
                                    <img src={book.image} alt={book.title} className="w-full h-32 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                                        <p className="text-sm text-gray-400">by {book.author}</p>
                                    </div>
                                </Link>
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

export default Search;