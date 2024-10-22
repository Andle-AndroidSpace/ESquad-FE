import React from 'react';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const MessageItem = ({ message, currentUsername, onEditMessage, onDeleteMessage, onDownloadFile, fileUrl }) => {
    const timestamp = new Date(message.timestamp).toLocaleTimeString();

    const isImage = (url) => {
        return url && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif'));
    };

    return (
        <div className="message-item" style={{ marginBottom: '1rem' }}>
            <span className="message-timestamp" style={{ display: 'block', marginBottom: '0.25rem', color: '#888' }}>
                {timestamp}
            </span>
            <div className="message-content">
                <span className="message-user" style={{ fontWeight: 'bold', marginRight: '0.5rem' }}>
                    {currentUsername || message.userId}
                </span>
                {message.message && (
                    <span className="message-text">{message.message}</span>
                )}

                {fileUrl && isImage(fileUrl) && (
                    <div className="image-preview" style={{ marginTop: '0.5rem' }}>
                        <img
                            src={fileUrl}
                            alt="파일 미리보기"
                            style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
                        />
                    </div>
                )}
            </div>
            <div className="message-actions" style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                {fileUrl && (
                    <IconButton
                        color="primary"
                        size="small"
                        onClick={() => onDownloadFile(fileUrl)}
                        aria-label="파일 다운로드"
                        style={{ marginRight: '0.5rem' }}
                    >
                        <DownloadIcon />
                    </IconButton>
                )}

                {!fileUrl && (
                    <IconButton
                        color="secondary"
                        size="small"
                        onClick={() => onEditMessage(message.id, message.message)} // 메시지 수정 함수 호출
                        aria-label="메시지 수정"
                        style={{ marginRight: '0.5rem' }}
                    >
                        <EditIcon />
                    </IconButton>
                )}

                <IconButton
                    color="error"
                    size="small"
                    onClick={() => onDeleteMessage(message.id, fileUrl)} // 메시지 삭제 함수 호출
                    aria-label="메시지 삭제"
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export default React.memo(MessageItem);
