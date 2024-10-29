import { useState } from "react";
import axios from "axios";
import { useBook } from "../book/BookProvider.jsx";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate 추가
import { TextField, Button, Grid2, MenuItem, Box, Typography, Container, Select, InputLabel, FormControl } from "@mui/material";

const StudyPageCreate = () => {
    const { teamId } = useParams();
    const numericTeamId = parseInt(teamId, 10);
    const { selectedBook } = useBook();
    const userIds = ["", ""]; // 사용자 ID 배열

    const [reminds, setReminds] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        studyPageName: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    const navigate = useNavigate(); // useNavigate 훅 사용

    const AlertDayOptions = [
        { label: "Monday", value: 0 },
        { label: "Tuesday", value: 1 },
        { label: "Wednesday", value: 2 },
        { label: "Thursday", value: 3 },
        { label: "Friday", value: 4 },
        { label: "Saturday", value: 5 },
        { label: "Sunday", value: 6 },
    ];

    const handleChange = (field, value) => {
        setFormData((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handleRemindChange = (index, field, value) => {
        const updatedReminds = [...reminds];
        updatedReminds[index] = {
            ...updatedReminds[index],
            [field]: value,
        };
        setReminds(updatedReminds);
    };

    const handleAddRemind = () => {
        setReminds([...reminds, { dayType: "", timeAt: "", description: "" }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("book");
        if (!selectedBook) {
            console.error("selectedBook 값이 설정되지 않았습니다.");
            return;
        }

        const studyPageDto = {
            bookDto: selectedBook,
            studyInfoDto: formData,
            reminds,
            userIds,
        };

        try {
            const response = await axios.post(`/api/${numericTeamId}/study-pages`, studyPageDto);
            console.log("StudyRead page created successfully!");
            navigate(`/${numericTeamId}/study-pages/${response.data}`); // 생성 성공 후 리다이렉트
        } catch (error) {
            console.error("Error creating study page:", error);
            setErrorMessage("An error occurred while creating the study page. Please try again.");
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
                <Typography variant="h4" component="h1" gutterBottom>
                    Create a New StudyRead Page
                </Typography>
                {errorMessage && <Typography color="error">{errorMessage}</Typography>}

                {/* StudyRead Page Name */}
                <Grid2 container spacing={2} direction="column" alignItems="center">
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <TextField
                            fullWidth
                            label="StudyRead Page Name"
                            variant="outlined"
                            value={formData.studyPageName}
                            onChange={(e) => handleChange("studyPageName", e.target.value)}
                            required
                            InputLabelProps={{ style: { color: "#fff" } }}
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
                                value={formData.startDate}
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
                                value={formData.endDate}
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
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            required
                            InputLabelProps={{ style: { color: "#fff" } }}
                            sx={{
                                input: { color: "white" },
                                "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                            }}
                        />
                    </Grid2>

                    {/* Reminds */}
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <Typography variant="h6">Reminds</Typography>
                        {reminds.map((remind, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <FormControl fullWidth>
                                    <InputLabel style={{ color: "white" }}>Date Type</InputLabel>
                                    <Select
                                        value={remind.dayType}
                                        onChange={(e) => handleRemindChange(index, "dayType", e.target.value)}
                                        label="Date Type"
                                        sx={{ color: "white" }}
                                    >
                                        {AlertDayOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <TextField
                                    fullWidth
                                    label="Time"
                                    type="time"
                                    value={remind.timeAt}
                                    onChange={(e) => handleRemindChange(index, "timeAt", e.target.value)}
                                    sx={{
                                        mt: 2,
                                        input: { color: "white" },
                                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    label="Description"
                                    value={remind.description}
                                    onChange={(e) => handleRemindChange(index, "description", e.target.value)}
                                    sx={{
                                        mt: 2,
                                        input: { color: "white" },
                                        "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" } },
                                    }}
                                />
                            </Box>
                        ))}
                        <Button onClick={handleAddRemind} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Add Reminder
                        </Button>
                    </Grid2>

                    {/* Submit Button */}
                    <Grid2 item xs={12} sx={{ width: "100%" }}>
                        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
                            Create StudyRead Page
                        </Button>
                    </Grid2>
                </Grid2>
            </Box>
        </Container>
    );
};

export default StudyPageCreate;
