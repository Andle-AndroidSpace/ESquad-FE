import React, { useState } from 'react';

import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


const NewQuestion = () => {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionContent, setQuestionContent] = useState('');
    const [writer, setWriter] = useState('');
    const [book, setBook] = useState('');
    const [file, setFile] = useState(null);
    const [text, setText] = useState(null);
    const [bookSuggestions, setBookSuggestions] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false); // For collapsing/expanding

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('질문 생성:', { questionTitle, questionContent, writer, book, file });
        setQuestionTitle('');
        setQuestionContent('');
        setWriter('');
        setBook('');
        setFile(null);
        setText(null);
        setBookSuggestions([]);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // Create a text of the selected file (if it's an image)
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

        // Simulate async search operation (replace with actual API call)
        if (query) {
            fetchBookSuggestions(query);
        } else {
            setBookSuggestions([]);
        }
    };

    const fetchBookSuggestions = async (query) => {
        // Replace with your actual API call logic
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
            {/* Title and Collapse/Expand Button */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Post a Question</h2>
                <button onClick={() => setIsExpanded(!isExpanded)} className="text-white">
                    {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                </button>
            </div>

            {isExpanded && (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* writer and Book Row */}
                    <div className="flex space-x-4">
                        {/* writer Input */}
                        <div className="flex flex-col w-2/5 space-y-2">
                            <input
                                type="text"
                                value={writer}
                                onChange={(e) => setWriter(e.target.value)}
                                placeholder="writer (Enter your name)"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Book Search */}
                        <div className="flex flex-col w-3/5 space-y-2 relative">
                            <input
                                type="text"
                                value={book}
                                onChange={handleBookSearch}
                                placeholder="Related Book (Search for a book...)"
                                className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {/* Book Suggestions Dropdown */}
                            {bookSuggestions.length > 0 && (
                                <div className="absolute top-full mt-1 w-full bg-gray-700 rounded-lg shadow-lg z-10">
                                    {bookSuggestions.map((book) => (
                                        <div
                                            key={book.id}
                                            className="flex items-center p-2 hover:bg-gray-600 cursor-pointer"
                                            onClick={() => setBook(book.title)}
                                        >
                                            <img src={book.image} alt={book.title} className="w-10 h-10 mr-2" />
                                            <span>{book.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Question Title */}
                    <div className="flex flex-col space-y-2">
                        <input
                            type="text"
                            value={questionTitle}
                            onChange={(e) => setQuestionTitle(e.target.value)}
                            placeholder="Question Title (Briefly describe your question...)"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Question Content */}
                    <div className="flex flex-col space-y-2">
                        <textarea
                            value={questionContent}
                            onChange={(e) => setQuestionContent(e.target.value)}
                            placeholder="Question Content (Provide more details about your question...)"
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="6"
                        />
                    </div>

                    {/* File Upload */}
                    <div className="flex flex-col space-y-2">
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {file && (
                            <div className="mt-2">
                                {text ? (
                                    <img src={text} alt="text" className="max-w-xs rounded-lg" />
                                ) : (
                                    <p className="text-gray-400">Selected file: {file.name}</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
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