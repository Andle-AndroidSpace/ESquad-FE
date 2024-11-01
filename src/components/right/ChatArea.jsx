import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ChatMessages from './ChatMessages';

const ChatArea = ({ teams }) => {
    const [currentChatRoom, setCurrentChatRoom] = useState(teams.length > 0 ? teams[0] : null);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {/* 상단에 표시되는 팀 정보 */}
            <Box sx={{ backgroundColor: 'grey.200', p: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
                    {teams.length > 0 ? currentChatRoom?.name : "Entered : none"}
                </Typography>
            </Box>

            {/* 채팅 메시지 영역 */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                {teams.length > 0 && currentChatRoom ? ( // teams가 존재하고 currentChatRoom이 있을 때
                    <ChatMessages currentChatRoom={currentChatRoom} />
                ) : (
                    <Typography variant="h6" sx={{ p: 2, fontSize: '1rem' }}>
                        소속된 팀이 없습니다. 팀에 가입해주세요! :)
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ChatArea;
