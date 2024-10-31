import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import {
    IconButton,
    Typography,
    Box,
    CssBaseline,
    InputBase,
    Button,
    Avatar,
} from '@mui/material';
import { useTheme, useMediaQuery, styled, alpha } from '@mui/material';
import AppBarComponent from "../../components/header/AppbarComponent.jsx";
import SidebarComponent from "../../components/header/SidebarComponent.jsx";
import PostListPage from "../community/PostListPage.jsx";
import ChatArea from "../../components/right/ChatArea.jsx";
import StudyPage from "../team/StudyPage.jsx";
import {useUser} from "../../components/form/UserContext.jsx";

const Home = () => {
    const theme = useTheme();
    const [selectedTab, setSelectedTab] = useState(0);      // 0: 커뮤니티, 1: 팀
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedSidebarItem, setSelectedSidebarItem] = useState(null);
    // const user = useUser();

    // 팀스페이스 불러와야 함 -> 채팅이랑 팀 헤더에 쏴줘야 함 (지금은 더미)
    const [teams, setTeams] = useState([
        { id: 2, teamName: "삐끼삐끼" },
        { id: 8, teamName: "whatca" },
        { id: 8, teamName: "쿠루쿠루" },
        { id: 56, teamName: "냠냠" }
    ]);
    const [selectedTeam, setSelectedTeam] = useState(null);

    const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));     // Below 1200px
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));      // Below 900px
    const isVerySmallScreen = useMediaQuery('(max-width: 30vw)');

    // Toggle the sidebar or open the drawer based on screen size
    const handleSidebarToggle = () => {
        if (isSmallScreen) {
            setDrawerOpen(true);
        } else {
            setSidebarOpen(!sidebarOpen);
        }
    };

    // Close the drawer
    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    // set selectedTab
    const handleTabState = (i) => {
        if(selectedTab !== i) {
            setSelectedTab(0);
            setSelectedTeam(null);
        }
    }

    // update selectedTeam
    const updateTeamState = (i) => {
        const changeSelectTeam = teams[i];
        if (selectedTeam?.id !== changeSelectTeam.id) {
            setSelectedTab(1);
            setSelectedTeam(changeSelectTeam);
        }
    };

    // useEffect to log the selected team after it updates ( 확인용 )
    useEffect(() => {
        if (selectedTeam !== null) {
            console.log(`Selected tab : ${JSON.stringify(selectedTab)}, selected team : ${JSON.stringify(selectedTeam)}`);
        }
        if(selectedTab === 0) {
            console.log(`Selected tab : ${JSON.stringify(selectedTab)}, selected team : ${JSON.stringify(selectedTeam)}`);
        }
    }, [selectedTab, selectedTeam]);

    return (
        <Box sx={{ display: 'flex', height: '100vh', width: '100vw' }}>
            <CssBaseline />

            {/* AppBar/AppbarComponent */}
            <AppBarComponent
                handleSidebarToggle={handleSidebarToggle}
                handleTab={handleTabState}
                selectedTab={selectedTab}
                teams={teams}
                updateTeam={updateTeamState}
            />

            {/* Home Content Area with Sidebar */}
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    height: 'calc(100vh - 57px)',
                    marginTop: '57px',
                }}
            >
                {/* Render Drawer instead of Sidebar when the screen width is less than 600px */}
                <SidebarComponent
                    isSmallScreen={isSmallScreen}
                    drawerOpen={drawerOpen}
                    sidebarOpen={sidebarOpen}
                    handleDrawerClose={handleDrawerClose}
                    selectedTab={selectedTab}
                    selectedTeam={selectedTeam}
                />

                {/* Home Content Area - Sidebar 제외한 나머지 body 영역 */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMediumScreen ? 'column' : 'row',
                        flexGrow: 1,
                        py: 2,      // warn
                        px: 2,      // warn
                        gap: 1,     // Community area 와 chat area gap
                        transition: 'width 0.3s ease',
                        backgroundColor: '#fff',
                    }}
                >
                    {/* Left Section - Community / Team Content */}
                    <Box
                        sx={{
                            // border: '1px solid',        // Community / team area border
                            flex: isMediumScreen ? 6 : 7,
                            flexDirection: 'row',
                            gap: 1,
                            height: isMediumScreen ? '60%' : '100%',
                        }}
                    >

                        <Outlet />
                    </Box>

                    {/* Right Section - Chat Area */}
                    <ChatArea
                        isSmallScreen={isSmallScreen}
                        isMediumScreen={isMediumScreen}
                        teams={teams}
                        selectedTeam={selectedTeam}
                        user={user}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default Home;