import { useState } from 'react';
import { FaEdit, FaTrash, FaCheck, FaTimes, FaThumbsUp, FaLaugh, FaHeart, FaUserCircle } from 'react-icons/fa';

const chatMessages = [
   {
       id: 1,
       user: 'User1',
       message: '졸린다ㅜ',
       timestamp: '10:45 AM',
       icon: <FaUserCircle className="text-white text-3xl" />,
       isUserMessage: false,
   },
   {
       id: 2,
       user: 'User2',
       message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ',
       timestamp: '11:30 AM',
       icon: <FaUserCircle className="text-white text-3xl" />,
       isUserMessage: false,
   },
   {
       id: 3,
       user: 'Me', // Representing the current user
       message: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ.',
       timestamp: '12:15 PM',
       icon: <FaUserCircle className="text-blue-400 text-3xl" />, // Different color for the current user
       isUserMessage: true,
   },
   {
       id: 4,
       user: 'User4',
       message: '어제 뭐 했어?',
       timestamp: '1:00 PM',
       icon: <FaUserCircle className="text-white text-3xl" />,
       isUserMessage: false,
   },
   {
       id: 5,
       user: 'User5',
       message: '주말에 계획 있어?',
       timestamp: '2:30 PM',
       icon: <FaUserCircle className="text-white text-3xl" />,
       isUserMessage: false,
   },
{
    id: 6,
    user: 'Me', // Representing the current user
    message: 'ㄴㄴㄴㄴ 침대에서 꿈쩍도 안할겨',
    timestamp: '2:34 PM',
    icon: <FaUserCircle className="text-blue-400 text-3xl" />, // Different color for the current user
    isUserMessage: true,
},
{
    id: 7,
    user: 'User4',
    message: 'ㅇㅈㅇㅈㅇㅈㅇㅈㅇ',
    timestamp: '2:34 PM',
    icon: <FaUserCircle className="text-white text-3xl" />,
    isUserMessage: false,
},
{
    id: 8,
    user: 'User4',
    message: '나도 그럴거 ㅇㅇㅇㅇ',
    timestamp: '2:35 PM',
    icon: <FaUserCircle className="text-white text-3xl" />,
    isUserMessage: false,
},
{
    id: 9,
    user: 'User4',
    message: '나도 그럴거 ㅇㅇㅇㅇ',
    timestamp: '2:35 PM',
    icon: <FaUserCircle className="text-white text-3xl" />,
    isUserMessage: false,
},
];


const ChatMessages = () => {
    return (
        <div className="flex flex-col flex-1 h-chat-c p-2 overflow-x-hidden">
            <h2 className="text-lg font-semibold mb-4 text-white">팀채널명</h2>
            <div className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                {chatMessages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${message.isUserMessage ? 'flex-row-reverse' : ''}`}
                    >
                        <div
                            className={`p-1 rounded-full h-10 w-10 flex items-center justify-center ${
                                message.isUserMessage ? 'bg-blue-500' : 'bg-gray-700'
                            }`}
                        >
                            {message.icon}
                        </div>
                        <div className={`flex flex-col ${message.isUserMessage ? 'items-end' : ''}`}>
                            <div
                                className={`flex items-center space-x-2 mb-1 ${
                                    message.isUserMessage ? 'text-right' : ''
                                }`}
                            >
                                <div className="text-sm font-semibold text-white">
                                    {message.user}
                                </div>
                                <div className="text-xs text-gray-400">
                                    {message.timestamp}
                                </div>
                            </div>
                            <div
                                className={`p-3 rounded-lg text-white ${
                                    message.isUserMessage ? 'bg-blue-500' : 'bg-gray-800'
                                }`}
                            >
                                {message.message}
                            </div>
                            {/* Edit/Delete Icons */}
                            {message.isUserMessage && (
                                <div className="flex space-x-4 mt-2 text-lg">
                                    <button
                                        className="text-yellow-300 hover:text-yellow-400"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="text-red-400 hover:text-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ChatMessages;