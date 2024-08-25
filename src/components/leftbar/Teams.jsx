import React from 'react';
import { MdAdd } from "react-icons/md";

const servers = [
    { id: 1, name: 'General Chat', icon: '🌍' },
    { id: 2, name: 'Gaming', icon: '🎮' },
    { id: 3, name: 'Music', icon: '🎵' },
    { id: 4, name: 'Coding', icon: '💻' },
    { id: 5, name: 'Movies', icon: '🎬' },
    // Add more servers as needed
];

const Teams = () => {
    return (
        <div className="flex flex-col items-center py-4 space-y-5 m-2">
            < MdAdd className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-xl hover:bg-gray-600 cursor-pointer"/>            
            {servers.map((server) => (
                <div
                    key={server.id}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-700 text-white text-xl hover:bg-gray-600 cursor-pointer"
                    title={server.name}
                >
                    {server.icon}
                </div>
            ))}
        </div>
    );
};

export default Teams;