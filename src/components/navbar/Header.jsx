import React from 'react';
import { FaBell, FaInbox, FaSearch } from 'react-icons/fa';
import { IoPersonCircleOutline } from "react-icons/io5";

const Header = () => {
    return (
        <header className="bg-gray-800 z-50 h-16 sticky top-0 text-white p-3 flex items-center justify-between">
            {/* Server/Application Title */}
            <h1 className="text-2xl font-bold cursor-pointer">ESquad</h1>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-xs mx-4 ">
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 pl-10 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Notification and Message Icons */}
            <div className="flex space-x-4">
                <button className="p-2 relative hover:bg-gray-700 rounded-full cursor-pointer">
                    <FaBell className="text-xl" />
                    <span className="w-4 h-4 bg-red-400 absolute text-xs rounded-xl flex items-center justify-center -top-0.5 -right-0.5">2</span>
                </button>
                <button className="p-2 relative hover:bg-gray-700 rounded-full cursor-pointer">
                    <FaInbox className="text-xl" />
                    <span className="w-4 h-4 bg-red-400 absolute text-xs rounded-xl flex items-center justify-center -top-0.5 -right-0.5">3</span>
                </button>
                <button className="p-2 relative hover:bg-gray-700 rounded-full cursor-pointer">
                    <IoPersonCircleOutline className="text-xl" />
                    <span className="w-4 h-4 bg-red-400 absolute text-xs rounded-xl flex items-center justify-center -top-0.5 -right-0.5">1</span>
                </button>
            </div>
        </header>
    );
};

export default Header;