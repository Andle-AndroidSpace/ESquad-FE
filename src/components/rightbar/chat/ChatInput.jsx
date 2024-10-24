import React, {useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import FilePreview from './components/FilePreview';
import {fileUpload} from "./chatApi/ChatFileApi.jsx";

const ChatInput = ({
                       message,
                       onMessageChange,
                       userId,
                       handleUploadClick,
                       editMessageId,
                       onSaveMessage,
                       handleSend,
                       handleRemoveFile,
                       selectedFile,
                       handleSendMessage,
                       targetId
                   }) => {
    const handleSendClick = async () => {
        if (selectedFile) {
            // 파일이 선택된 경우
            const uploadResponse = await fileUpload(selectedFile, targetId); // 파일 업로드 함수 호출
            if (uploadResponse) {
                handleSend(''); // 메시지 없이 파일만 전송
                onMessageChange({ target: { value: '' } }); // 메시지 입력 필드를 비웁니다.
            } else {
                alert("파일 업로드 실패");
            }
        } else if (message.trim()) {
            // 메시지가 있는 경우
            if (editMessageId) {
                onSaveMessage();
            } else {
                handleSend(message, null); // 메시지 전송
            }
        } else {
            alert("메시지를 입력해주세요.");
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                flexDirection: 'row',
                padding: '0.5rem',
                backgroundColor: '#1f2937',
                borderRadius: '4px',
                height: 'auto'
            }}
        >
            {selectedFile ? (
                // 파일이 선택된 경우, TextField를 숨김
                <Box sx={{ display: 'flex',
                           alignItems: 'center',
                           marginRight: '8px' }}>
                    <FilePreview file={selectedFile} />
                    <IconButton color="error" onClick={handleRemoveFile} aria-label="파일 제거">
                        <CloseIcon />
                    </IconButton>
                </Box>
            ) : (
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-normal"
                    variant="filled"
                    placeholder="Message Input :P !!"
                    value={message}
                    onChange={onMessageChange}
                    disabled={!userId}
                    fullWidth
                    sx={{
                        marginBottom: '0.5rem',
                        '& .MuiInputBase-input': {
                            color: 'white',
                        },
                        '& .MuiInputBase-input::placeholder': {
                            color: 'white',
                            opacity: 0.8,
                        },
                    }}
                />
            )}
            <IconButton color="success" onClick={handleUploadClick} disabled={!userId} aria-label="파일 업로드">
                <AttachFileIcon />
            </IconButton>

            <IconButton
                color="primary"
                onClick={handleSendClick}
                className="send-button"
                disabled={!userId}
                aria-label={editMessageId ? "메시지 저장" : "메시지 전송"}
            >
                <SendIcon />
            </IconButton>
        </Box>
    );
};

export default ChatInput;
