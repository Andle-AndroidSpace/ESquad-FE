import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams();  // URL에서 id 값 추출
    const [question, setQuestion] = useState(null);  // 질문 데이터를 저장할 상태
    const [loading, setLoading] = useState(true);    // 로딩 상태
    const [error, setError] = useState(null);        // 에러 상태

    // API 호출로 데이터를 가져오는 함수
    useEffect(() => {
        const fetchQuestionDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/questions/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch question details');
                }
                const data = await response.json();  // JSON 응답 처리
                setQuestion(data);  // 데이터 상태 저장
                setLoading(false);  // 로딩 종료
            } catch (error) {
                setError(error.message);  // 에러 상태 저장
                setLoading(false);
            }
        };

        fetchQuestionDetail();  // API 호출 실행
    }, [id]);

    // 로딩 중일 때 화면에 표시할 내용
    if (loading) {
        return <div>Loading...</div>;
    }

    // 에러 발생 시 화면에 표시할 내용
    if (error) {
        return <div>Error: {error}</div>;
    }

    // 데이터가 없을 때 표시할 내용
    if (!question) {
        return <div>No question found</div>;
    }

    // 데이터를 성공적으로 받아왔을 때 렌더링할 내용
    return (
        <div className="container mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">{question.title}</h1>
            <p className="text-sm text-gray-400 mb-2">
                Posted by {question.writerName} on {question.createdAt}
            </p>
            <p className="mb-6">{question.content}</p>
            {question.file && (
                <img src={question.file} alt="Attached" className="max-w-md rounded-lg mb-4" />
            )}
            <p>Likes: {question.likes}</p>
        </div>
    );
};

export default QuestionDetail;
