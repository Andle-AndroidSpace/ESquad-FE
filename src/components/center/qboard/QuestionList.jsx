import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';

const QuestionList = ({ questions, currentPage, questionsPerPage, onPageChange }) => {
    const totalQuestions = (currentPage - 1) * questionsPerPage + questions.length;

    return (
        <div className="mt-4 flex-grow bg-gray-900 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 text-white border border-gray-700">
                    <thead>
                    <tr>
                        <th className="p-2 border-b border-gray-600 text-center">번호</th>
                        <th className="p-2 border-b border-gray-600 text-center">도서명</th>
                        <th className="p-2 border-b border-gray-600 text-center">제목</th>
                        <th className="p-2 border-b border-gray-600 text-center">작성자</th>
                        <th className="p-2 border-b border-gray-600 text-center">작성일</th>
                        <th className="p-2 border-b border-gray-600 text-center">좋아요수</th>
                    </tr>
                    </thead>
                    <tbody>
                    {questions.map((q, index) => (
                        <tr key={q.id} className="hover:bg-gray-700 cursor-pointer">
                            <td className="p-2 border-b border-gray-600 text-center">
                                {totalQuestions - index}
                            </td>
                            <td className="p-2 border-b border-gray-600 text-center">{q.book}</td>
                            <td className="p-2 border-b border-gray-600 text-center">
                                <Link to={`/questions/${q.id}`} className="text-blue-400 hover:underline">
                                    {q.title}
                                </Link>
                            </td>
                            <td className="p-2 border-b border-gray-600 text-center">{q.writerName}</td>
                            <td className="p-2 border-b border-gray-600 text-center">{q.createdAt}</td>
                            <td className="p-2 border-b border-gray-600 text-center">{q.likes}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalItems={questions.length}
                itemsPerPage={questionsPerPage}
                currentPage={currentPage}
                onPageChange={onPageChange}
            />
        </div>
    );
};

export default QuestionList;
