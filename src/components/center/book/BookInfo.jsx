import { useEffect, useState } from 'react';
import { useBook } from './BookProvider.jsx';
import BookRecognize from './BookRecognize.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const BookInfo = () => {
    const { isbn } = useParams();  // ISBN from URL params
    const { selectedBook, setSelectedBook } = useBook();  // Book context
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // Store error information

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const goToStudyPageCreate = () => {
        navigate(`/100/study-pages/create`);
    };

    const formatDate = (pubdate) => {
        if (!pubdate || pubdate.length !== 8) return ''; // Return empty if pubdate format is wrong
        const year = pubdate.substring(0, 4);
        const month = pubdate.substring(4, 6);
        const day = pubdate.substring(6, 8);
        return `${year}/${month}/${day}`;
    };

    const {
        title = '제목 없음',
        author = '작자 미상',
        description = '설명 없음',
        image = '이미지 없음',
        publisher = '출판사 없음',
        pubdate = ' ',
        link = '#'
    } = selectedBook || {};

    const titleWithoutParentheses = title.replace(/\(.*?\)/, '').trim();
    const parenthesesContent = title.match(/\((.*?)\)/)?.[1];
    const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

    useEffect(() => {
        const fetchBook = async () => {
            try {
                setLoading(true);
                const query = parseInt(isbn, 10);
                const response = await axios.get(`/api/book/search?query=${query}`);
                // localStorage.setItem('book', JSON.stringify(response.data));
                setSelectedBook(response.data[0]);
            } catch (err) {
                if(err.response.status === 404) {
                    const response = await axios.get(`/api/book/search?query=${query}`);
                    // localStorage.setItem('book', JSON.stringify(response.data));
                    setSelectedBook(response.data[0]);
                }
                console.error('Error fetching book:', err);  // Log error to console
                setError('책 정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };

        if (!selectedBook || !selectedBook.title) {
            fetchBook();
        }
    }, [isbn, selectedBook, setSelectedBook]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            {loading && <p>책 정보를 불러오는 중입니다...</p>}
            {error && <p className="text-red-500">{error}</p>}  {/* Display error if any */}

            {/* 책 정보가 없을 경우에 대한 처리 추가 */}
            {!loading && !selectedBook && !error && (
                <p className="text-gray-500">책 정보를 찾을 수 없습니다.</p>
            )}

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                <div className="relative w-full md:w-2/5">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
                    />
                </div>

                <div className="flex-1 space-y-4">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900">
                        {titleWithoutParentheses}
                        <span className="text-xs md:text-sm font-normal text-gray-500"> {parenthesesContent}</span>
                    </h1>

                    <ul className="flex items-center space-x-4 text-sm text-gray-500">
                        <li className="flex items-center">
                            <span className="ml-1">저자</span>
                            <span className="text-gray-500">{author}</span>
                        </li>
                        <li className="flex items-center border-l border-gray-300 pl-4">
                            <span className="ml-1">출판</span>
                            <span className="text-gray-500">{publisher}</span>
                        </li>
                        <li className="flex items-center border-l border-gray-300 pl-4">
                            <span className="ml-1 text-gray-500">{formatDate(pubdate)}</span>
                        </li>
                    </ul>

                    <div className="mt-4">
                        <h2 className="text-xs md:text-sm font-medium text-gray-900 mb-1">책 소개 요약</h2>
                        <p className="text-xs md:text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm">
                            {truncatedDescription}
                        </p>
                    </div>

                    <div className="mt-4">
                        <h2 className="text-xs md:text-sm font-medium text-gray-900 mb-1">책 추천</h2>
                        <div className="text-xs md:text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm">
                            <BookRecognize />
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={toggleExpand}
                        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                    >
                        +
                    </button>
                    <div
                        className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
                            expanded ? 'mt-4 opacity-100' : 'mt-0 opacity-0 pointer-events-none'
                        }`}
                    >
                        <button
                            onClick={goToStudyPageCreate}
                            className="w-10 h-10 bg-green-500 text-white rounded-full mt-2 shadow-lg"
                        >
                            1
                        </button>
                        <button
                            onClick={() => window.location.href = "/page2"}
                            className="w-10 h-10 bg-red-500 text-white rounded-full mt-2 shadow-lg"
                        >
                            2
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">책 소개</h2>
                <p className="text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-lg">
                    {description}
                </p>
            </div>

            <div className="mt-6">
                <h2 className="text-sm font-medium text-gray-500 mb-1">ISBN</h2>
                <p className="text-base font-light text-gray-700 bg-gray-50 p-3 rounded-lg shadow-sm">
                    {isbn}
                </p>
            </div>

            <div className="mt-4">
                <h2 className="text-sm font-medium text-gray-500 mb-1">React Example</h2>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-light text-blue-600 hover:text-blue-400 transition duration-200 ease-in-out underline"
                >
                    Go to Example Website
                </a>
            </div>
        </div>
    );
};

export default BookInfo;
