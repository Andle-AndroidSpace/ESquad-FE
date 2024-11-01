import axios from "axios";

// 파일 업로드 API 호출
export const fileUpload = async (file, targetId, targetType) => {
    try {
        const token = localStorage.getItem('jwt');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetId', targetId); // targetId 추가
        formData.append('targetType', "CHAT"); // targetType 추가

        const response = await axios.post(`http://localhost:8080/api/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading file:", error.response ? error.response.data : error.message);
        return null;
    }
};

// 파일 삭제 API 호출
export const fileDelete = async (filename) => {
    try {
        const token = localStorage.getItem('jwt');
        const response = await axios.delete(`http://localhost:8080/api/files/${filename}`, {
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

// 파일 다운로드 API 호출
export const fileDownload =async (fileName) => {
    const fileUrl = `http://localhost:8080/api/files/${fileName}`;
    try {
        const response = await fetch(fileUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
        });

        if (!response.ok) {
            throw new Error("파일 다운로드 실패");
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName); // 다운로드할 파일 이름
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error("파일 다운로드 중 오류 발생:", error);
    }
};