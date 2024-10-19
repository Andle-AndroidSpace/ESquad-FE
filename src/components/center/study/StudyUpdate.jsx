import {useEffect, useState} from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import LiveStreamWindow from '../../../pages/stream/LiveStreamWindow.jsx';
import axios from "axios";

const Study = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(false);
   // Filtered studies based on search query
   const filteredStudies = dummyStudies.filter(study =>
      study.title.toLowerCase().includes(searchQuery.toLowerCase())
   );

   const buttonClick = async () => {
        setLoading(true);
        const userId = 1;
        const studyPageId = 100;

        axios.post("/api/stu", {
            userId: userId,
            studyPageId: studyPageId
        }).catch(function (error) {
            console.error('Error delete page:', error);  // Log error to console
            setError('책 정보를 불러오는 중 오류가 발생했습니다.');
        }).finally(function () {
            setLoading(false);
        })
    };



   return (
        <div className="flex-1 p-4 bg-gray-900 text-white">
            {/* Search Box */}
            <div className="mb-6"> {/* Increased margin-bottom for more gap */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for studies..."
                    className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Display the list of studies in a card format */}
            {filteredStudies.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    {currentItems.map((study) => (
                        <li key={study.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <Link to={`/pages/study-pages/${study.id}`} study={study} className="block">
                                <img src={study.image} alt={study.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                                    <p className="text-sm text-gray-400">by {study.author}</p>
                                    <p className="text-sm text-gray-500">Opened: {study.publishedDate}</p>
                                    {/* New Button Added */}
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevents Link click when button is clicked
                                            openLiveStreamWindow(study.id);
                                        }}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                    >
                                        Join Live
                                    </button>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-400">No results found.</p>
            )}

            {/* Pagination Controls */}
            {filteredStudies.length > 0 && (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="flex items-center text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
  );
};


export default Study;