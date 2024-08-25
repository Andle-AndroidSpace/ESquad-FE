import React, { useState } from 'react';
import Pagination from './Pagination';

// Mock data (100 items)
const mockQuestions = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    title: `Question Title ${index + 1}`,
    author: `Author ${index + 1}`,
    createdAt: new Date(2024, 7, index + 1).toLocaleDateString(), // Example dates
  }));
  
  
const QuestionList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const QuestionsPerPage = 10; // Ensure this value matches your pagination settings

    // Calculate the current questions to display
    const startIndex = (currentPage - 1) * QuestionsPerPage;
    const currentQuestions = mockQuestions.slice(startIndex, startIndex + QuestionsPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="mt-4 flex-grow bg-gray-900 rounded-lg shadow-lg">
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 text-white border border-gray-700">
                    <thead>
                        <tr>
                            <th className="p-2 border-b border-gray-600 text-center">제목</th>
                            <th className="p-2 border-b border-gray-600 text-center">작성자</th>
                            <th className="p-2 border-b border-gray-600 text-center">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentQuestions.map((q) => (
                            <tr key={q.id} className="hover:bg-gray-700 cursor-pointer">
                                <td className="p-2 border-b border-gray-600">
                                    <a href={`#${q.id}`} className="text-blue-400 hover:underline">
                                        {q.title}
                                    </a>
                                </td>
                                <td className="p-2 border-b border-gray-600">{q.author}</td>
                                <td className="p-2 border-b border-gray-600">{q.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination
                totalItems={mockQuestions.length}
                itemsPerPage={QuestionsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default QuestionList;