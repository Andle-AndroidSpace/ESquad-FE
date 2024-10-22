// ChatFileApi.jsx
import axios from "axios";

export const fileUpload = async (file, username) => {
    try {
        const token = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('username', username);

        const response = await axios.post(`http://localhost:8080/api/chat/file/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response ? error.response.data : error.message);
        return null;
    }
};

export const fileDelete = async (filename) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.delete(`http://localhost:8080/api/chat/file/delete/${filename}`, {
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting file:", error.response ? error.response.data : error.message);
        return null;
    }
};

export const fileDownload = async (filename) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`http://localhost:8080/api/chat/file/download/${filename}`, {
            responseType: 'blob',
            headers: {
                Authorization: `Bearer ${token}`, // 인증 토큰 추가
            },
        });

        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'downloaded_file';
        if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch && fileNameMatch.length === 2) {
                fileName = fileNameMatch[1];
            }
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error downloading file:", error.response ? error.response.data : error.message);
    }
};