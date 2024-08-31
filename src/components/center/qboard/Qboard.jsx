import React, { useState, useEffect } from 'react';
import NewQuestion from './NewQuestion';
import QuestionList from './QuestionList';

const Qboard = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const questionsPerPage = 10;

    useEffect(() => {
        fetchQuestions(currentPage, questionsPerPage);
    }, [currentPage]);

    const fetchQuestions = async (page, size) => {
        try {
            const response = await fetch(`/api/questions?page=${page - 1}&size=${size}`);
            const data = await response.json();
            setQuestions(data.content);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleNewQuestionSubmit = async (formData) => {
        try {
            const response = await fetch('/api/questions', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                fetchQuestions(currentPage, questionsPerPage);  // 질문 목록 갱신
            } else {
                console.error('Failed to post question');
            }
        } catch (error) {
            console.error('Error posting question:', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        fetchQuestions(pageNumber, questionsPerPage);
    };

    return (
        <main className="flex-col flex-grow bg-gray-900 text-white h-full">
            <NewQuestion onSubmit={handleNewQuestionSubmit} />
            <QuestionList
                questions={questions}
                currentPage={currentPage}
                questionsPerPage={questionsPerPage}
                onPageChange={handlePageChange}
            />
        </main>
    );
};

export default Qboard;
