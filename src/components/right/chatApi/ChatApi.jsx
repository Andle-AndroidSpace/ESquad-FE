// ChatApi.jsx
import axios from "axios";


export const fetchMessage = async (roomId) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:8080/api/chat/messages/${roomId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });
        return response.data.messages || [];
    } catch (error) {
        console.error("Error fetching messages", error);
        return [];
    }
};

export const sendMessage = async (messageData) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.post(`http://localhost:8080/api/chat/send`, messageData, {
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error sending message", error);
        return null;
    }
};

export const editChatMessage = async (roomId, messageId, editMessageData) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.put(`http://localhost:8080/api/chat/${roomId}/${messageId}`, editMessageData, {
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating message", error);
        return null;
    }
};

export const deleteMessage = async (roomId, messageId, userId) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.delete(`http://localhost:8080/api/chat/${roomId}/${messageId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
            data: { userId },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting message", error);
        return null;
    }
};