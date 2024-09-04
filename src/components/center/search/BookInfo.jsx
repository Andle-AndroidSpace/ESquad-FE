import React, {useEffect, useState} from 'react';
import { useBook } from './BookProvider.jsx';
// import {useParams} from "react-router-dom";

const BookInfo = () => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    // const {isbn} = useParams();
    const {selectedBook} = useBook(); // books 데이터를 Context에서 가져옴

    // 날짜 형식 변환 함수
    const formatDate = (pubdate) => {
        if (!pubdate || pubdate.length !== 8) return ''; // pubdate가 없거나 형식이 잘못된 경우

        const year = pubdate.substring(0, 4); // 연도 추출
        const month = pubdate.substring(4, 6); // 월 추출
        const day = pubdate.substring(6, 8); // 일 추출

        return `${year}/${month}/${day}`;
    };

    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    //
    //
    //
    //
    //
    // // 예시로 백엔드에서 데이터를 가져온다고 가정
    // useEffect(() => {
    //     const fetchBook = async () => {
    //         setLoading(true);
    //         setError(null); // reset any previous error
    //         try {
    //             const response = await fetch(`/api/book/search?query=${encodeURIComponent(selectedBook.isbn)}`);
    //             if (!response.ok) {
    //                 throw new Error(`Error: ${response.statusText}`);
    //             }
    //             const data = await response.json();
    //             setSelectBook(data); // Context에 책 데이터 저장
    //             // eslint-disable-next-line no-unused-vars
    //         } catch (error) {
    //             setError("책 데이터를 불러오는 중 오류가 발생했습니다.");
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchBook();
    // }, [isbn]);
    //
    // if (loading) {
    //     return (
    //         <div className="flex-1 p-4 bg-gray-900 text-white">
    //             <h2>책 정보를 불러오는 중입니다...</h2>
    //         </div>
    //     );
    // }
    // book 객체가 없거나 필수 속성이 없는 경우
    if (!selectedBook || !selectedBook.title || !selectedBook.author) {
        return (
            <div className="flex-1 p-4 bg-gray-900 text-white">
                <h2>책 정보를 찾을 수 없습니다.</h2>
                <p>책 정보가 잘못되었거나 누락되었습니다. 😢</p>
            </div>
        );
    }

    // book 객체가 유효한 경우 그 값을 분해하여 사용
    const { title, author, description = '설명 없음', image, publisher = "출판사 없음", pubdate, link, isbn } = selectedBook;


    const titleWithoutParentheses = title.replace(/\(.*?\)/, '').trim();  // 괄호 안의 내용 제거
    const parenthesesContent = title.match(/\((.*?)\)/)?.[1];  // 괄호 안의 내용 추출
    const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;

    return (

        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
            {/* 도서 정보 상단 */}
            {/*{error && <p className="text-red-500">{error}</p>}*/}
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
                {/* 도서 이미지 */}
                <div className="relative w-full md:w-2/5"> {/* 이미지 크기를 반으로 설정 */}
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
                </div>
                <div className="relative flex flex-col items-center">
                    {/* 메인 원형 버튼 */}
                    <button
                        onClick={toggleExpand}
                        className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ease-in-out"
                    >
                        +
                    </button>

                    {/* 위로 확장되는 두 개의 추가 버튼 */}
                    <div
                        className={`flex flex-col items-center transition-all duration-300 ease-in-out ${
                            expanded ? 'mt-4 opacity-100' : 'mt-0 opacity-0 pointer-events-none'
                        }`}
                    >
                        <button
                            onClick={() => window.location.href = "/page1"}
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

