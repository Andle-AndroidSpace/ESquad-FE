// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FaBell, FaRegCommentDots } from 'react-icons/fa';
import AlarmContent from './alarm/AlarmContent';
import ChatContent from './chat/ChatContent';

const Rightbar = () => {
    const [activeContent, setActiveContent] = useState('chat'); // Default to 'chat' content

    const handleEmoticonClick = (type) => {
        setActiveContent(type);
    };

    return (
        <>
            {/* utilButtonContainer */}
            <div className="h-10 flex justify-center items-center p-4 bg-gray-900 text-white">
                <button
                    className="p-2 rounded-full hover:bg-gray-700 focus:outline-none cursor-pointer "
                    onClick={() => handleEmoticonClick('chat')}
                >
                    <FaRegCommentDots className="text-lg" />
                </button>
                <button
                    className="p-2 ml-3 rounded-full hover:bg-gray-700 focus:outline-none cursor-pointer"
                    onClick={() => handleEmoticonClick('alarm')}
                >
                    <FaBell className="text-lg" />
                </button>
            </div>

            {/* utilContainer*/}
            <div className="flex flex-1 bg-gray-900 text-white h-util-c min-h-0">
                {activeContent === 'chat' ? <ChatContent /> : <AlarmContent />}
            </div>
        </>
    );
};
export default Rightbar;