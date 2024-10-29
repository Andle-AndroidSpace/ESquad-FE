import { useState, useEffect } from "react";
import axios from "axios";
import { useBook } from "../book/BookProvider.jsx";
import { useParams, useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Grid2,
    Box,
    Typography,
    Container,
} from "@mui/material";

const StudyPageUpdate = () => {
    const { teamId, studyId } = useParams();
    const numericTeamId = parseInt(teamId, 10);
    const { selectedBook } = useBook();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");
    const [UpdateStudyPageRequestDto, setUpdateStudyPageRequestDto] = useState({
        studyPageName: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    useEffect(() => {
        // 기존 스터디 페이지 정보를 불러오기
        const fetchStudyPage = async () => {
            try {
                const response = await axios.get(`/api/${numericTeamId}/study-pages/${studyId}`);
                const studyPageData = response.data;

                // 불러온 데이터로 상태 업데이트
                setUpdateStudyPageRequestDto({
                    title: studyPageData.studyPageName,
                    startDate: studyPageData.startDate,
                    endDate: studyPageData.endDate,
                    description: studyPageData.description,
                });
            } catch (error) {
                console.error("Error fetching study page:", error);
                setErrorMessage("Failed to fetch study page data. Please try again.");
            }
        };

        fetchStudyPage();
    }, [numericTeamId, studyId]);

    const handleChange = (field, value) => {
        setUpdateStudyPageRequestDto((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedBook) {
            console.error("selectedBook 값이 설정되지 않았습니다.");
            return;
        }

        try {
            await axios.post(`/api/${numericTeamId}/study-pages/${studyId}`, UpdateStudyPageRequestDto);
            console.log("Study page updated successfully!");
            navigate(`/${numericTeamId}/study-pages/${studyId}`); // 업데이트 후 해당 스터디 페이지로 이동
        } catch (error) {
            console.error("Error updating study page:", error);
            setErrorMessage("An error occurred while updating the study page. Please try again.");
        }
    };

    return (
        <Container maxWidth="md">
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    mt: 3,
                    backgroundColor: "#333",
                    padding: "24px",
                    borderRadius: "8px",
                    boxShadow: 2,
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontSize: {
                            xs: "24px",
                            sm: "32px",
                            md: "40px",
                        },
                    }}
                >
                    Update StudyPageRead Page
                </Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                {/* StudyPageRead Page Name */}
                <Grid2 container spacing={2} direction="column" alignItems="center">
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="StudyPageRead Page Name"
                            variant="outlined"
                            value={UpdateStudyPageRequestDto.studyPageName}
                            onChange={(e) => handleChange("studyPageName", e.target.value)}
                            required
                            InputLabelProps={{
                                style: { color: "#fff" },
                            }}
                            sx={{
                                input: { color: "white" },
                                "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                            }}
                        />
                    </Grid2>

                    {/* Start Date and End Date */}
                    <Grid2 container spacing={2} item xs={12} justifyContent="center">
                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Start Date"
                                type="date"
                                InputLabelProps={{ shrink: true, style: { color: "#fff" } }}
                                value={UpdateStudyPageRequestDto.startDate}
                                onChange={(e) => handleChange("startDate", e.target.value)}
                                required
                                sx={{
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                                }}
                            />
                        </Grid2>

                        <Grid2 item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="End Date"
                                type="date"
                                InputLabelProps={{ shrink: true, style: { color: "#fff" } }}
                                value={UpdateStudyPageRequestDto.endDate}
                                onChange={(e) => handleChange("endDate", e.target.value)}
                                required
                                sx={{
                                    input: { color: "white" },
                                    "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                                }}
                            />
                        </Grid2>
                    </Grid2>

                    {/* Description */}
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="Description"
                            multiline
                            rows={4}
                            value={UpdateStudyPageRequestDto.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            required
                            InputLabelProps={{
                                style: { color: "#fff" },
                            }}
                            sx={{
                                input: { color: "white" },
                                "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                            }}
                        />
                    </Grid2>

                    {/* Submit Button */}
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
                            Update StudyPageRead Page
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
};

export default StudyPageUpdate;
