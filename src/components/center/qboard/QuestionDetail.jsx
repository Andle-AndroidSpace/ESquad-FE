import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuestionDetail = () => {
    const { id } = useParams(); // URL에서 id 값 추출
    const [question, setQuestion] = useState(null); // 질문 데이터를 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [newComment, setNewComment] = useState(''); // 새 댓글 입력 상태
    const [likes, setLikes] = useState(0); // 좋아요 수 상태
    const [isLiked, setIsLiked] = useState(false); // 좋아요 여부 상태

    useEffect(() => {
        const fetchQuestionDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/questions/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch question details');
                }
                const data = await response.json(); // JSON 응답 처리
                setQuestion(data); // 데이터 상태 저장
                setLikes(data.likes); // 서버에서 받아온 좋아요 수 저장
                setLoading(false); // 로딩 종료
            } catch (error) {
                setError(error.message); // 에러 상태 저장
                setLoading(false);
            }
        };

        fetchQuestionDetail(); // API 호출 실행
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setComments([...comments, { writer: 'User', content: newComment }]); // 임시 댓글 추가
        setNewComment(''); // 댓글 입력란 초기화
    };

    const handleLikeToggle = () => {
        if (isLiked) {
            setLikes(likes - 1); // 좋아요 취소 시 감소
        } else {
            setLikes(likes + 1); // 좋아요 클릭 시 증가
        }
        setIsLiked(!isLiked); // 좋아요 상태 변경
    };

    if (loading) {
        return <div className="text-center text-white">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error: {error}</div>;
    }

    if (!question) {
        return <div className="text-center text-white">No question found</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-gray-900 text-white rounded-lg shadow-lg">
            <div className="mb-4">
                <div className="flex justify-start items-center space-x-2">
                    <p className="text-lg font-bold text-gray-300">작성자: {question.writerName}</p>
                    <p className="text-lg text-gray-400">{new Date(question.createdAt).toLocaleString()}</p>
                </div>
            </div>

            <h1 className="text-4xl font-bold mb-4 text-left">{question.title}</h1>

            <div className="mb-6 text-left">
                <p className="text-lg leading-relaxed">{question.content}</p>
            </div>

            {/* 첨부파일 자리 - 나중에 표시할 공간 */}
            {question.file && (
                <div className="mb-6 text-left">
                    <img
                        src={question.file}
                        alt="Attached"
                        className="w-full max-w-lg rounded-lg shadow-lg"
                    />
                </div>
            )}

            <div className="mb-6 flex items-center space-x-4 text-left">
                <button
                    onClick={handleLikeToggle}
                    className={`px-4 py-2 ${isLiked ? 'bg-blue-700' : 'bg-blue-600'} text-white rounded-lg hover:bg-blue-700`}
                >
                    ♥️
                </button>
                <p className="text-lg text-gray-400">{likes}</p>
            </div>

            {/* 댓글 목록 */}
            <div className="mb-6 text-left">
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                {comments.length > 0 ? (
                    <ul className="space-y-2">
                        {comments.map((comment, index) => (
                            <li key={index} className="bg-gray-800 p-3 rounded-lg">
                                <p className="font-bold">{comment.writer}</p>
                                <p>{comment.content}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">아직 댓글이 없습니다.</p>
                )}
            </div>

            {/* 댓글 입력 폼 */}
            <form onSubmit={handleCommentSubmit} className="mt-6 text-left">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요."
                    className="w-full p-3 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Comment
                </button>
            </form>
        </div>
    );
};

export default QuestionDetail;
