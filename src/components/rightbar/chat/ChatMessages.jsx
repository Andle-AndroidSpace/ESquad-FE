// ChatMessages.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from "../../form/UserContext.jsx";
import { fetchMessage, sendMessage, editChatMessage, deleteMessage } from "./chatApi/ChatApi.jsx";
import { fileUpload, fileDelete, fileDownload } from "./chatApi/ChatFileApi.jsx";
import ChatInput from "./ChatInput.jsx";
import MessageList from "./MessageList.jsx";
import "./css/ChatMessages.css";
import FilePreview from "./components/FilePreview.jsx";

const ChatMessages = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [editMessageId, setEditMessageId] = useState(null);
    const [editMessage, setEditMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const { userInfo } = useUser();
    const userId = userInfo ? userInfo.id : "";
    const username = userInfo ? userInfo.username : "";
    const roomId = "1";

    const loadMessages = async () => {
        const fetchedMessages = await fetchMessage(roomId);
        const updatedMessages = fetchedMessages.map((msg) => {
            const savedFileUrl = localStorage.getItem(`file_${msg.id}`);
            return savedFileUrl ? { ...msg, fileUrl: savedFileUrl } : msg;
        });
        setMessages(updatedMessages);
    };

    useEffect(() => {
        loadMessages();
        const intervalId = setInterval(loadMessages, 3000); // 3초마다 메시지 업데이트
        return () => clearInterval(intervalId);
    }, [roomId]);

    const handleSendMessage = async (messageText, file) => {
        console.log("Current userId:", userId);
        if (messageText.trim() === "" && !file) return;

        let fileUrl = null;
        if (file) {
            const uploadResponse = await fileUpload(file, userId, "CHAT");
            if (uploadResponse && uploadResponse.storedFileName) {
                fileUrl = `http://localhost:8080/api/files/${uploadResponse.storedFileName}`;
            } else {
                console.error("파일 업로드 실패:", uploadResponse);
                return;
            }
        }

        const messageData = {
            userId,
            message: file ? "" : messageText,
            roomId,
            ...(fileUrl && { fileUrl }),
        };

        const sendResponse = await sendMessage(messageData);

        // sendResponse 구조 확인
        if (!sendResponse || sendResponse.status !== "success") {
            console.error('메시지 전송 실패:', sendResponse);
            alert("메시지 전송에 실패했습니다.");
            return;
        }

        const messageId = sendResponse.messageId || sendResponse.data.messageId;
        if (!messageId) {
            console.error("메시지 ID가 없습니다:", sendResponse);
            return;
        }

        const newMessage = {
            ...messageData,
            id: messageId,
            timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
            return updatedMessages;
        });
        setMessage("");
        setSelectedFile(null);
        setPreviewUrl(""); // 미리보기 초기화
    };

    const handleEditMessageFunc = (id, currentMessage) => {
        setEditMessageId(id);
        setEditMessage(currentMessage);
    };

    const handleSaveEditMessage = async () => {
        if (editMessage.trim() === "") return;

        const response = await editChatMessage(roomId, editMessageId, { newMessage: editMessage, userId });

        if (response && response.status === "success") {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === editMessageId ? { ...msg, message: editMessage } : msg
                )
            );
            setEditMessageId(null);
            setEditMessage("");
        } else {
            console.error('메시지 수정 실패:', response);
            alert("메시지 수정에 실패했습니다.");
        }
    };

    const handleDeleteMessageFunc = async (id, fileUrl) => {
        const response = await deleteMessage(roomId, id, userId);
        if (response && response.status === "success") {
            setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));

            if (fileUrl) {
                const filename = fileUrl.split('/').pop(); // URL에서 파일명 추출
                const deleteResponse = await fileDelete(filename);
                if (deleteResponse) {
                    console.log('파일 삭제 성공:', deleteResponse);
                } else {
                    console.error('파일 삭제 실패');
                }
            }
        } else {
            console.error('메시지 삭제 실패:', response);
            alert("메시지 삭제에 실패했습니다.");
        }
    };

    const handleDownloadFile = async (fileUrl) => {
        const filename = fileUrl.split('/').pop();
        try {
            const response = await fetch(fileUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/octet-stream', // 바이너리 파일을 처리하도록 명시적으로 설정
                },
            });

            if (!response.ok) {
                throw new Error("파일 다운로드 실패");
            }

            const blob = await response.blob(); // 파일을 Blob 형태로 변환
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename); // 파일명을 설정
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            // Blob URL을 메모리에서 해제
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("파일 다운로드 중 오류 발생:", error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        console.log("선택한 파일:", file);

        if (file) {
            // 이미지 파일일 경우 미리보기 URL 생성
            if (file.type.startsWith("image/")) {
                const filePreviewUrl = URL.createObjectURL(file);
                setPreviewUrl(filePreviewUrl);
                setMessage("");
            } else {
                setPreviewUrl(null);
                setMessage(prevMessage => prevMessage.replace(/\s*\[파일: .+?\]/, ''));
            }

            // 파일 태그 생성
            setMessage(prevMessage => {
                const newMessage = prevMessage.replace(/\s*\[파일: .+?\]/, '');
                const fileTag = `[file: ${file.name}]`;
                return newMessage + fileTag;
            });
        }
    };

    const handleUploadClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setMessage((prevMessage) => prevMessage.replace(/\s*\[파일: .+?\]/, ''));
    };

    return (
        <div className="chat-container">
            <MessageList
                messages={messages}
                userId={userId}
                username={username}
                onEditMessage={handleEditMessageFunc}
                onDeleteMessage={handleDeleteMessageFunc}
                onDownloadFile={handleDownloadFile}
            />
            <ChatInput
                message={editMessageId ? editMessage : message}
                onMessageChange={(e) => {
                    const newMessage = e.target.value;
                    if (editMessageId) {
                        setEditMessage(newMessage);
                    } else {
                        setMessage(newMessage);
                    }
                }}
                handleSend={(messageText) => handleSendMessage(messageText, selectedFile)} // 파일도 함께 전달
                onSaveMessage={handleSaveEditMessage}
                editMessageId={editMessageId}
                userId={userId}
                handleUploadClick={handleUploadClick}
                handleRemoveFile={handleRemoveFile}
            />
            <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            {previewUrl && <FilePreview file={selectedFile} />} {/* 미리보기 */}
        </div>
    );
};

export default ChatMessages;
