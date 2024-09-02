// Pagination.jsx
import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            onPageChange(pageNumber);
        }
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={() => handlePageClick(currentPage - 1)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
                >
                    {index + 1}
                </button>
            ))}
            <button
                onClick={() => handlePageClick(currentPage + 1)}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
