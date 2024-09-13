import {useEffect, useState} from 'react';
import {useBook} from './BookProvider.jsx';
import BookRecognize from "./BookRecognize.jsx";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";


const BookInfo = () => {
    // 주소에서 isbn 값 가져오기
    const { isbn } = useParams();
    // context 선택된 Book 정보 가져오기
    const {selectedBook, setSelectedBook} = useBook();
    // React Router 의 useNavigate 훅 사용하여 study create
    const navigate = useNavigate();

    // 요일 선택장 확장
    const [expanded, setExpanded] = useState(false);
    // 정보 불러오는 과정
    const [loading, setLoading] = useState(false);
    // 에러 상태 정보 저장
    const [error, setError] = useState(null);

    // 요일 토글 함수
    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // 생성 페이지로 이동 함수
    const goToStudyPageCreate = () => {
        navigate(`/100/studyPage/create`);
    };

    // 날짜 형식 변환 함수
    const formatDate = (pubdate) => {
        if (!pubdate || pubdate.length !== 8) return ''; // pubdate가 없거나 형식이 잘못된 경우

        const year = pubdate.substring(0, 4); // 연도 추출
        const month = pubdate.substring(4, 6); // 월 추출
        const day = pubdate.substring(6, 8); // 일 추출

        return `${year}/${month}/${day}`;
    };

    // book 객체가 유효한 경우 그 값을 분해하여 사용
    const { title, author='작자 미상', description = '설명 없음', image='이미지 없음', publisher = "출판사 없음", pubdate=' ', link} = selectedBook;

    // title => 본제목 + 소제목
    const titleWithoutParentheses = title.replace(/\(.*?\)/, '').trim();  // 괄호 안의 내용 제거
    const parenthesesContent = title.match(/\((.*?)\)/)?.[1];  // 괄호 안의 내용 추출
    const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

    // 리렌더 시, 백엔드에서 데이터 가져오기
    useEffect(() => {
        // 백엔드에서 데이터 가져오기
        const fetchBook = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/book/search?query=${isbn}`);
                console.log(response);
                setSelectedBook(response.data[0]);  // Assuming the book data is in response.data
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }

            // 로딩 하는 경우
            if (loading) {
                return (
                    <div className="flex-1 p-4 bg-gray-900 text-white">
                        <h2>책 정보를 불러오는 중입니다...</h2>
                    </div>
                );
            }

            // 에러가 발생한 경우
            if (error) {
                return (
                    <div className="flex-1 p-4 bg-gray-900 text-white">
                        <h2>오류 발생: {error}</h2>
                    </div>
                );
            }
        };

        // book 객체가 없거나 필수 속성이 없는 경우
        if (!selectedBook || !selectedBook.title || !selectedBook.author|| !selectedBook.isbn) {
            fetchBook(); // Fetch if selectedBook is missing
            setLoading(false);
            return (
                <div className="flex-1 p-4 bg-gray-900 text-white">
                    <h2>책 정보를 찾을 수 없습니다.</h2>
                    <p>책 정보가 잘못되었거나 누락되었습니다. 😢</p>
                </div>
            );
        }

    }, [isbn, selectedBook, setSelectedBook]);

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
            {/* 도서 정보 상단 */}
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                {/* 도서 이미지 */}
                <div className="relative w-full md:w-2/5">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto rounded-lg shadow-md transition-transform transform hover:scale-105"
                    />
                </div>

                {/* 도서 제목 및 상세 정보 */}
                <div className="flex-1 space-y-4">
                    <div className="text-left">
                        <h1 className="text-lg md:text-xl font-bold text-gray-900">
                            {titleWithoutParentheses}
                            <span className="text-xs md:text-sm font-normal text-gray-500"> {parenthesesContent}</span>
                        </h1>
                    </div>

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
                            <span className="ml-1 text-gray-500">
                                {formatDate(pubdate)}
                            </span>
                        </li>
                    </ul>

                    {/* 축약된 책 소개 */}
                    <div className="mt-4">
                        <h2 className="text-xs md:text-sm font-medium text-gray-900 mb-1 text-left">책 소개 요약</h2>
                        <p className="text-xs md:text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm text-left">
                            {truncatedDescription}
                        </p>
                    </div>
                    {/* 추천 도서 */}
                    <div className="mt-4">
                        <h2 className="text-xs md:text-sm font-medium text-gray-900 mb-1 text-left">책 추천</h2>
                        <p className="text-xs md:text-xs text-gray-700 leading-relaxed bg-gray-50 p-2 rounded-lg border border-gray-200 shadow-sm text-left">
                            <BookRecognize/>
                        </p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={toggleExpand}
                        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out"
                    > + </button>
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
            {/*도서 정보 하단*/}
            <div>
                {/* 도서 설명 */}
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
        </div>
    );
};
export default BookInfo;
