import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const NewQuestion = ({ onSubmit }) => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [writer, setWriter] = useState('');
    const [book, setBook] = useState('');
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [bookSuggestions, setBookSuggestions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', questionTitle);
        formData.append('content', questionContent);
        formData.append('writer', writer);
        formData.append('book', book);
        if (file) {
            formData.append('file', file);
        }

        onSubmit(formData);
        resetForm();
    };

    const resetForm = () => {
        setQuestionTitle('');
        setQuestionContent('');
        setWriter('');
        setBook('');
        setFile(null);
        setText(null);
        setBookSuggestions([]);
        setIsExpanded(false);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setText(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setText(null);
        }
    };

    const handleBookSearch = (e) => {
        const query = e.target.value;
        setBook(query);

        if (query) {
            fetchBookSuggestions(query);
        } else {
            setBookSuggestions([]);
        }
    };

    const handleBookSelect = (bookTitle) => {
        setBook(bookTitle);          // 선택한 책 제목으로 설정
        setBookSuggestions([]);      // 드롭다운을 숨기기 위해 빈 배열로 설정
    };

    const fetchBookSuggestions = async (query) => {
        const mockBooks = [
            { id: 1, title: 'JavaScript: The Good Parts', image: 'https://via.placeholder.com/50' },
            { id: 2, title: 'You Don’t Know JS', image: 'https://via.placeholder.com/50' },
            { id: 3, title: 'Eloquent JavaScript', image: 'https://via.placeholder.com/50' },
        ];

        const filteredBooks = mockBooks.filter(book =>
            book.title.toLowerCase().includes(query.toLowerCase())
        );

        setBookSuggestions(filteredBooks);
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Post a Question</h2>
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-white">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex space-x-4">
                        <div className="flex flex-col w-2/5 space-y-2">
                            <input
                                type="text"
                                value={writer}
                                onChange={(e) => setWriter(e.target.value)}
                                placeholder="작성자"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex flex-col w-3/5 space-y-2 relative">
                            <input
                                type="text"
                                value={book}
                                onChange={handleBookSearch}
                                placeholder="책제목"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {bookSuggestions.length > 0 && (
                                <div className="absolute top-full mt-1 w-full bg-gray-700 rounded-lg shadow-lg z-10">
                                    {bookSuggestions.map((book) => (
                                        <div
                                            key={book.id}
                                            className="flex items-center p-2 hover:bg-gray-600 cursor-pointer"
                                            onClick={() => handleBookSelect(book.title)}
                                        >
                                            <img src={book.image} alt={book.title} className="w-10 h-10 mr-2" />
                                            <span>{book.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            placeholder="제목"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <textarea
                            value={questionContent}
                            onChange={(e) => setQuestionContent(e.target.value)}
                            placeholder=""
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {file && (
                            <div className="mt-2">
                                {text ? (
                                    <img src={text} alt="Preview" className="max-w-xs rounded-lg" />
                                ) : (
                                    <p className="text-gray-400">Selected file: {file.name}</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            질문 올리기
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default NewQuestion;
