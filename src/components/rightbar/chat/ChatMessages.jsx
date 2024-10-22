// 메세지 송신, 수신, 수정, 삭제 각 api 의 정보 + 파일 업로드, 삭제, 다운로드 각 api 들의 정보를 담고 있는 클래스.
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
    const { userInfo } = useUser(); // userInfo를 Context에서 가져오기
    const userId = userInfo ? userInfo.id : ""; // userId를 userInfo에서 가져옴
    const username = userInfo ? userInfo.username : ""; // 사용자 이름 추가
    const roomId = "1"; // 방 ID는 고정

    const loadMessages = async () => {
        const fetchedMessages = await fetchMessage(roomId);

        // 업데이트된 메시지에서 로컬 스토리지에 저장된 이미지 URL을 불러옴
        const updatedMessages = fetchedMessages.map((msg) => {
            const savedImageUrl = localStorage.getItem(`image_${msg.id}`);

            // URL이 제대로 불러와졌는지 확인
            if (savedImageUrl) {
                console.log(`Image URL loaded from localStorage for message ${msg.id}:`, savedImageUrl);
                return { ...msg, fileUrl: savedImageUrl }; // 이미지 URL이 있으면 메시지에 포함
            }
            return msg; // 이미지 URL이 없으면 기존 메시지를 그대로 반환
        });
        setMessages(updatedMessages); // 업데이트된 메시지 상태 설정
    };

    useEffect(() => {
        // 로컬 스토리지에서 메시지 로드
        const savedMessages = localStorage.getItem("chatMessages");
        if (savedMessages) {
            const parsedMessages = JSON.parse(savedMessages);

            // 로컬 스토리지에서 저장된 메시지들을 로드할 때 파일 URL도 매핑
            const messagesWithFileUrls = parsedMessages.map((msg) => {
                const fileUrl = localStorage.getItem(`image_${msg.id}`);
                return { ...msg, fileUrl };
            });
            setMessages(messagesWithFileUrls);
        }
        loadMessages();
        // const intervalId = setInterval(loadMessages, 3000); // 3초마다 메시지 업데이트
        // return () => clearInterval(intervalId);
    }, [roomId]);


    const handleSendMessage = async (messageText, file) => {
        console.log("Current userId:", userId);
        if (messageText.trim() === "" && !file) return;

        let fileUrl = null;
        if (file) {
            const uploadResponse = await fileUpload(file, userId);
            if (uploadResponse && uploadResponse.fileName) {
                fileUrl = `http://localhost:8080/api/chat/file/download/${uploadResponse.fileName}`;
            } else {
                console.error("파일 업로드 실패");
                return;
            }
        }

        const messageData = {
            userId,
            message: file ? "": messageText,
            roomId,
            ...(fileUrl && {fileUrl}),
        };

        const sendResponse = await sendMessage(messageData);

        // sendResponse 구조 확인
        if (!sendResponse || sendResponse.status !== "success") {
            console.error('메시지 전송 실패:', sendResponse);
            alert("메시지 전송에 실패했습니다.");
            return;
        }

        // messageId를 안전하게 추출
        const messageId = sendResponse.messageId || sendResponse.data.messageId;
        if (!messageId) {
            console.error("메시지 ID가 없습니다:", sendResponse);
            return;
        }

        // 메시지 추가
        const newMessage = {
            ...messageData,
            id: messageId,
            timestamp: new Date().toISOString(),
        };

        setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages, newMessage];
            localStorage.setItem("chatMessages", JSON.stringify(updatedMessages)); // 저장할 때 파일 URL 포함
            if(fileUrl){
                localStorage.setItem(`image_${messageId}`, fileUrl);
            }
            return updatedMessages;
        });
        setMessage("");
        setSelectedFile(null); // 파일 선택 초기화
        setPreviewUrl("");
    };

    const handleEditMessageFunc = (id, currentMessage) => {
        setEditMessageId(id);
        setEditMessage(currentMessage);
    };

    const handleSaveEditMessage = async () => {
        if (editMessage.trim() === "") return;

        const response = await editChatMessage(roomId, editMessageId, {newMessage: editMessage, userId});

        if (response && response.status === "success") {
            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === editMessageId ? {...msg, message: editMessage} : msg
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

            // 브라우저에서 Blob 파일을 다운로드
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
            //setSelectedFile(file);
            if (file.type.startsWith("image/")) {
                const filePreviewUrl = URL.createObjectURL(file);
                setPreviewUrl(filePreviewUrl);
                setMessage("");
            } else {
                setPreviewUrl(null);
                setMessage(prevMesssage => prevMesssage.replace(/\s*\[파일: .+?\]/, ''));
            }
            // 기존의 파일 태그를 제거하고 새로운 파일 태그를 추가
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
        setMessage(prevMessage => prevMessage.replace(/\s*\[파일: .+?\]/, ''));
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
            {previewUrl && <FilePreview file={selectedFile} />}

        </div>
    );
};
export default ChatMessages;