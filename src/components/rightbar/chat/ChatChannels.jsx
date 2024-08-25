import React from 'react';
import { FaAngry, FaFrown, FaGrin, FaMeh, FaSmile } from 'react-icons/fa';

const chatChannelMock = [
    { id: 1, name: 'team1', icon: <FaSmile className="text-yellow-500 text-xl" /> },
    { id: 2, name: 'team2', icon: <FaGrin className="text-green-500 text-xl" /> },
    { id: 3, name: 'team3', icon: <FaFrown className="text-red-500 text-xl" /> },
    { id: 4, name: 'team4', icon: <FaAngry className="text-orange-500 text-xl" /> },
    { id: 5, name: 'team5', icon: <FaMeh className="text-gray-500 text-xl" /> },
];


const ChatChannels = () => {
   return (
       <div className="flex flex-col items-center py-4 space-y-5">
           {chatChannelMock.map((channel) => (
               <div
                   key={channel.id}
                   className="w-12 h-12 p-2 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 cursor-pointer"
                   title={channel.name}
               >
                   <div className="text-white text-lg">{channel.icon}</div>
               </div>
           ))}
       </div>
   );
};


export default ChatChannels;