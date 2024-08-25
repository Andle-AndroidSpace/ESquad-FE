import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const ChatInput = () => {
    return (
        <div className="flex items-center h-14 bg-gray-900 p-2 shadow-lg">
            <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow bg-gray-700 p-3 rounded-l-xl text-white outline-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <button className="bg-blue-500 p-3 rounded-r-xl hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center">
                <FaPaperPlane className="text-white text-lg" />
            </button>
        </div>
    );
};

export default ChatInput;