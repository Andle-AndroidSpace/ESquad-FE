import React from 'react';
import { useBook } from './BookProvider.jsx';
// import {useParams} from "react-router-dom";

const BookInfo = () => {
    // const {isbn} = useParams();
    const {selectedBook} = useBook(); // books 데이터를 Context에서 가져옴
    // const [loading, setLoading] = useState(false);

    // book 객체가 유효한 경우 그 값을 분해하여 사용
    const { title, author, description = '설명 없음', image, publisher = "출판사 없음", pubdate, link, isbn } = selectedBook;


    const titleWithoutParentheses = title.replace(/\(.*?\)/, '').trim();  // 괄호 안의 내용 제거
    const parenthesesContent = title.match(/\((.*?)\)/)?.[1];  // 괄호 안의 내용 추출
    const truncatedDescription = description.length > 200 ? description.slice(0, 200) + '...' : description;


    // book 객체가 없거나 필수 속성이 없는 경우
    if (!selectedBook || !selectedBook.title || !selectedBook.author) {
        return (
            <div className="flex-1 p-4 bg-gray-900 text-white">
                <h2>책 정보를 찾을 수 없습니다.</h2>
                <p>책 정보가 잘못되었거나 누락되었습니다. 😢</p>
            </div>
        );
    }

    // if (loading) {
    //     return (
    //         <div className="flex-1 p-4 bg-gray-900 text-white">
    //             <h2>책 정보를 불러오는 중입니다...</h2>
    //         </div>
    //     );
    // }
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out">
            {/* 도서 정보 상단 */}
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
                    <div>
                        {/* 제목과 부제목 */}
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{titleWithoutParentheses}</h1>
                        <p className="text-base md:text-lg text-gray-500">{parenthesesContent}</p>
                    </div>
                    <ul className="space-y-2">
                        {/* 저자, 출판사 */}
                        <li className="flex">
                            <span className="w-24 md:w-32 font-semibold text-gray-800">저자</span>
                            <span className="text-gray-800">{author}</span>
                        </li>
                        <li className="flex">
                            <span className="w-24 md:w-32 font-semibold text-gray-800">출판사</span>
                            <span className="text-gray-800">{publisher}</span>
                        </li>
                        <li className="flex">
                            <span className="w-24 md:w-32 font-semibold text-gray-800">출판일</span>
                            <span className="text-gray-800">{pubdate}</span>
                        </li>
                    </ul>

                    {/* 축약된 책 소개 */}
                    <div className="mt-4">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">책 소개 요약</h2>
                        <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                            {truncatedDescription}
                        </p>
                    </div>
                    {/*<div>*/}
                    {/*    <button onClick={() => {*/}
                    {/*        console.log('Button clicked');*/}
                    {/*    }}>버튼*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
            {/*도서 정보 하단*/}
            {/*<div>*/}
            {/*    /!* 도서 설명 *!/*/}
            {/*    <div className="mt-6">*/}
            {/*        <h2 className="text-2xl font-semibold text-gray-900 mb-2">책 소개</h2>*/}
            {/*        <p className="text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-lg">*/}
            {/*            {description}*/}
            {/*        </p>*/}
            {/*    </div>*/}
                {/* ISBN */}
                {/*<div className="mt-6">*/}
                {/*    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Isbn</h2>*/}
                {/*    <p className="text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-lg">*/}
                {/*        {isbn}*/}
                {/*    </p>*/}
                {/*</div>*/}
                {/* 네이버 도서 URL */}
                {/*<div>*/}
                {/*    <h2 style="color:black;"> 더보기 </h2>*/}
                {/*    <a href={{link}} style="color:black;">더보기</a>*/}
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );
};
export default BookInfo;