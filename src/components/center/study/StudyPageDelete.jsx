import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Container, Typography, Box, TextField } from "@mui/material";

// eslint-disable-next-line react/prop-types
const StudyPageDelete = ({ teamId, studyId, studyname }) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [inputName, setInputName] = useState(""); // 사용자 입력 이름 상태

    const handleDelete = async () => {
        try {
            console.log("Input name type:", typeof inputName); // 입력값의 타입 출력
            console.log("Input name value:", inputName); // 입력값 출력

            // 삭제 요청 보내기
            await axios.delete(`/api/${teamId}/study-pages/${studyId}`, {
                params: { name: inputName }, // 사용자 입력 이름으로 대체
            });
            console.log("Study page deleted successfully!");
            // 삭제 후 다른 페이지로 이동
            navigate(`/${teamId}/study-pages`);
        } catch (error) {
            console.error("Error deleting study page:", error);
            setErrorMessage("An error occurred while deleting the study page. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, padding: 2, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Delete Study Page
                </Typography>
                <Typography variant="body1" color="error">
                    {errorMessage}
                </Typography>
                <Typography variant="body1">
                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    Are you sure you want to delete the study page "{studyname}"? Please type the name below:
                </Typography>
                <TextField
                    label="Study Page Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)} // 입력 변경 처리
                />
                <Button
                    onClick={handleDelete}
                    variant="contained"
                    color="error"
                    sx={{ mt: 3 }}
                >
                    Delete
                </Button>
            </Box>
        </Container>
    );
};

export default StudyPageDelete;
