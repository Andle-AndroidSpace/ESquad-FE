// 미리보기 구현이 끝나고 모듈화 진행시 사용할 클래스임.

import {useState} from "react";
import {fileUpload} from "../chatApi/ChatFileApi.jsx";

const useChatFIle = (username) => {
    const [selectFile, setSelectFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectFile(file);
        if (file && file.type.startsWith("image/")) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFileUpload = async () => {
        if (!selectFile) return null;
        const response = await fileUpload(selectFile, username);
        return response?.fileName ? `http://localhost:8080/api/chat/file/download/${response.fileName}` : null;
    };

    const handleFileRemove = () => {
        setSelectFile(null);
        setPreviewUrl(null);
    };

    return {
        selectFile,
        previewUrl,
        handleFileChange,
        handleFileUpload,
        handleFileRemove,
    };
};

export default useChatFIle;
