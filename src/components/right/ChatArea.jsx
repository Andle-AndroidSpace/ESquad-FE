import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, IconButton, Avatar, InputBase } from '@mui/material';
import { alpha, useTheme } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ChatMessages from './ChatMessages'; // ChatMessages 컴포넌트 임포트

const ChatArea = ({ isSmallScreen, isMediumScreen, teams }) => {
    const theme = useTheme();
    const [currentChatRoom, setCurrentChatRoom] = useState(teams[0]);

    // Chat Room Selection Handler
    const handleChatRoomSelect = (room) => {
        setCurrentChatRoom(room);
    };

    return (
        <Box
            sx={{
                flex: isMediumScreen ? 4 : 3,
                gap: 1,
                p: 2,
                height: isMediumScreen ? '40%' : '100%',
                overflowX: 'auto',
                display: 'flex',
                transition: 'width 0.3s ease',
                flexDirection: 'column',
            }}
        >
            {/* Chat Rooms - Top Row for Larger Viewports */}
            {!isMediumScreen && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        overflowX: 'auto',
                        borderBottom: `1px solid ${theme.palette.divider}`,
                        pb: 1,
                    }}
                >
                    {teams.map((team, index) => (
                        <Button
                            key={index}
                            onClick={() => handleChatRoomSelect(team)}
                            className="chat-room-button"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                p: 1,
                                backgroundColor: currentChatRoom?.id === team.id ? alpha(theme.palette.primary.main, 0.1) : '#fff',
                                borderRadius: 1,
                                '&:hover': {
                                    backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                },
                                border: '1px solid',
                                borderColor: currentChatRoom?.id === team.id ? '#D1C4E9' : theme.palette.primary.main,
                                minWidth: isSmallScreen ? '80px' : '120px',
                                fontSize: isSmallScreen ? '0.75rem' : '1rem',
                                mb: 1,
                            }}
                        >
                            {team.teamName}
                        </Button>
                    ))}
                </Box>
            )}

            {/* Chat Rooms and Chat Messages - Split Columns for Smaller Viewports */}
            {isMediumScreen && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        height: '100%',
                        overflowX: 'auto',
                        pb: 2,
                    }}
                >
                    {/* Chat Rooms - Left Column */}
                    <Box
                        sx={{
                            flex: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1,
                            overflowY: 'auto',
                            borderRight: `1px solid ${theme.palette.divider}`,
                            pr: 2,
                        }}
                    >
                        {teams.map((team, index) => (
                            <Button
                                key={index}
                                onClick={() => handleChatRoomSelect(team)}
                                className="chat-room-button"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 1,
                                    backgroundColor: currentChatRoom?.id === team.id ? alpha(theme.palette.primary.main, 0.1) : '#fff',
                                    borderRadius: 1,
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.main, 0.2),
                                    },
                                    border: '1px solid',
                                    borderColor: currentChatRoom?.id === team.id ? '#D1C4E9' : theme.palette.primary.main,
                                    minWidth: isSmallScreen ? '80px' : '120px',
                                    fontSize: isSmallScreen ? '0.75rem' : '1rem',
                                    mb: 1,
                                }}
                            >
                                {team.teamName}
                            </Button>
                        ))}
                    </Box>

                    {/* Chat Messages - Right Column */}
                    <Box
                        sx={{
                            flex: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'width 0.3s ease',
                            overflowY: 'hidden',
                        }}
                    >
                        <ChatMessages currentChatRoom={currentChatRoom} /> {/* ChatMessages 컴포넌트 호출 */}
                    </Box>
                </Box>
            )}

            {/* Chat Messages - Home Column for Larger Viewports */}
            {!isMediumScreen && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        mt: 2,
                        flexGrow: 1,
                        borderRadius: 3,
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="body1" sx={{ color: theme.palette.primary.main, mb: 2 }}>Entered: {currentChatRoom.teamName}</Typography>
                    <ChatMessages currentChatRoom={currentChatRoom} /> {/* ChatMessages 컴포넌트 호출 */}
                </Box>
            )}
        </Box>
    );
};

export default ChatArea;
