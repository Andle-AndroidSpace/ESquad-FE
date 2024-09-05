import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ChatMessages = () => {
    const [message, setMessage] = useState("");
    const [userId, setUserId] = useState("user1"); // Mock user ID.
    const [messages, setMessages] = useState([]);
    const [editMessageId, setEditMessageId] = useState(null);
    const [editMessage, setEditMessage] = useState("");

    const roomId = "teamSpaceChatRoom";

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/chat/messages/${roomId}`);
                if (response.data && Array.isArray(response.data.messages)) {
                    setMessages(response.data.messages);
                } else {
                    console.error("Expected an array but got:", response.data);
                    setMessages([]);
                }
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        fetchMessages();

        const intervalId = setInterval(fetchMessages, 500);

        return () => clearInterval(intervalId);
    }, [roomId]);

    const sendMessage = async () => {
        if (message.trim() === "") return;

        const messageData = {
            userId: userId,
            message: message,
            roomId: roomId,
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/chat/send`, messageData);
            if (response.data.status === "success") {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        ...messageData,
                        id: response.data.messageId,  // Use messageId returned by the server
                        timestamp: new Date().toISOString()
                    },
                ]);
                setMessage("");
            } else {
                console.error("Error sending message:", response.data.message);
            }
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const startEditMessage = (id, currentMessage) => {
        setEditMessageId(id);
        setEditMessage(currentMessage);
    };

    const saveEditMessage = async () => {
        if (editMessage.trim() === "") return;

        try {
            const response = await axios.put(`http://localhost:8080/api/chat/edit/${roomId}/${editMessageId}`, {
                newMessage: editMessage,
                userId: userId,
            });
            if (response.data.status === "success") {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === editMessageId ? { ...msg, message: editMessage } : msg
                    )
                );
                setEditMessageId(null);
                setEditMessage("");
            } else {
                console.error("Error updating message:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating message", error);
        }
    };

    const deleteMessage = async (id) => {
        setEditMessageId(null);
        setEditMessage("");

        if (!id) {
            console.error("No message ID provided for deletion");
            return;
        }

        try {
            const response = await axios.delete(`http://localhost:8080/api/chat/delete/${roomId}/${id}`, {
                data: { userId: userId },
            });
            if (response.data.status === "success") {
                setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
            } else {
                console.error("Error deleting message:", response.data.message);
            }
        } catch (error) {
            console.error("Error deleting message", error);
        }
    };

    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    return (
        <div className="flex flex-col flex-1 h-full p-2 overflow-x-hidden bg-gray-900">
            <div className="mb-4">
                <input
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="Enter your User ID"
                    className="w-full p-2 mb-2 border border-gray-600 rounded bg-gray-800 text-white"
                />
                <h4 className="text-white">User ID: {userId || "Not set"}</h4>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
                {messages.length > 0 ? (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start space-x-3 ${msg.userId === userId ? 'flex-row-reverse' : ''}`}
                        >
                            <div
                                className={`p-2 rounded-full h-10 w-10 flex items-center justify-center ${
                                    msg.userId === userId ? 'bg-blue-500' : 'bg-gray-700'
                                }`}
                            >
                                {msg.userId === userId ? "You" : <span>{msg.userId}</span>}
                            </div>
                            <div className={`flex flex-col ${msg.userId === userId ? 'items-end' : ''}`}>
                                <div
                                    className={`flex items-center space-x-2 mb-1 ${
                                        msg.userId === userId ? 'text-right' : ''
                                    }`}
                                >
                                    <div className="text-sm font-semibold text-white">
                                        {msg.userId === userId ? "You" : msg.userId}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                                <div
                                    className={`p-3 rounded-lg text-white ${
                                        msg.userId === userId ? 'bg-blue-500' : 'bg-gray-800'
                                    }`}
                                >
                                    {msg.id === editMessageId ? (
                                        <input
                                            type="text"
                                            value={editMessage}
                                            onChange={(e) => setEditMessage(e.target.value)}
                                            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                                        />
                                    ) : (
                                        msg.message
                                    )}
                                </div>

                                {msg.userId === userId && (
                                    <div className="flex space-x-4 mt-2 text-lg">
                                        <button
                                            onClick={() => startEditMessage(msg.id, msg.message)}
                                            className="text-yellow-300 hover:text-yellow-400"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteMessage(msg.id)}
                                            className="text-red-400 hover:text-red-500"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No messages available</p>
                )}
            </div>
            <div className="flex items-center space-x-4 mt-4">
                <input
                    type="text"
                    value={editMessageId ? editMessage : message}
                    onChange={(e) => editMessageId ? setEditMessage(e.target.value) : setMessage(e.target.value)}
                    className="flex-1 p-2 border border-gray-600 rounded bg-gray-800 text-white"
                    disabled={!userId}
                />
                <button
                    onClick={editMessageId ? saveEditMessage : sendMessage}
                    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={!userId}
                >
                    {editMessageId ? "Save" : "Send"}
                </button>
            </div>
        </div>
    );
};

export default ChatMessages;
