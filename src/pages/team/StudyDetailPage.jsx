import React, { useState } from 'react';
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    Divider,
    Button,
} from '@mui/material';
import {useLocation, useParams} from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import bookProfileManAndSea from '../../assets/book-profile-man-and-sea.jpg';


const StudyDetailPage = ({ isSmallScreen, isMediumScreen }) => {
    const location = useLocation();
    const study = location.state.study;
    const params = useParams();
    const [isStudyDeleteModalOpen, setIsStudyDeleteModalOpen] = useState(false);
    const [attachments, setAttachments] = useState(study.attachments || []);
    const [selectedFile, setSelectedFile] = useState();

    const handleDeleteButtonClick = () => {
        setIsStudyDeleteModalOpen(true);
    };

    const handleCloseStudyDeleteModal = () => {
        setIsStudyDeleteModalOpen(false);
    };

    const handleAddAttachment = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUploadAttachment = () => {
        if (selectedFile) {
            const newAttachment = {
                name: selectedFile.name,
                id: selectedFile.name + Date.now(), // Generate unique ID for the file
            };
            setAttachments([...attachments, newAttachment]);
            setSelectedFile(null);
        }
    };

    const handleDeleteAttachment = (index) => {
        const updatedAttachments = attachments.filter((_, i) => i !== index);
        setAttachments(updatedAttachments);
    };

    return (
        <Box
            sx={{
                border: '1px solid',
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                mb: 3,
                p: 2,
                gap: 2,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    height: '20vh',
                    overflowY: 'auto',
                }}
            >
                <Box
                    component="img"
                    src={study.bookImage || bookProfileManAndSea}
                    alt={study.title}
                    sx={{
                        width: '100%',
                        objectFit: 'contain',
                        mb: 2,
                    }}
                />
            </Box>
            <Divider sx={{borderBottom: '1px solid #ddd'}} />

            {/* Study Data Section */}
            <Box sx={{ my: 4 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {study.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    {study.members}
                </Typography>
            </Box>

            {/* Attachments Section */}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>공유파일 리스트</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }}>
                        {/* File Upload Input */}
                        <Button
                            variant="contained"
                            component="label"
                            color="primary"
                            startIcon={<UploadFileIcon />}
                        >
                            파일 추가
                            <input
                                type="file"
                                hidden
                                onChange={handleAddAttachment}
                            />
                        </Button>


                    </Box>

                    {/* Selected Files Preview */}
                    {selectedFile &&  (
                        <Box sx={{ mb: 2, display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" color="textSecondary">
                                선택한 파일:
                            </Typography>
                            <ListItem>
                                <ListItemIcon>
                                    <AttachFileIcon />
                                </ListItemIcon>
                                <ListItemText primary={selectedFile.name} />
                            </ListItem>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleUploadAttachment}
                            >
                                업로드
                            </Button>
                        </Box>
                    )}

                    {/* Attachments List */}
                    <List>
                        {attachments && attachments.length > 0 ? (
                            attachments.map((attachment, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        <AttachFileIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={attachment.name} />
                                    <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAttachment(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItem>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                첨부파일이 없습니다.
                            </Typography>
                        )}
                    </List>
                </AccordionDetails>
            </Accordion>

            {/* Post Creation Modal */}
            {/*<StudyCreatgionDialog*/}
            {/*    open={isStudyModalOpen}*/}
            {/*    onClose={handleCloseStudyModal}*/}
            {/*    selectedTeamId={params.teamId}*/}
            {/*    selectedBook={book}*/}
            {/*/>*/}
        </Box>
    );
};

export default StudyDetailPage;
