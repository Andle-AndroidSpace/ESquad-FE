import { useState } from "react";
import axios from "axios";
import { useBook } from "../search/BookProvider.jsx";
import { useParams } from "react-router-dom";
import { TextField, Button, Grid2, MenuItem, Box, Typography, Container, Select, InputLabel, FormControl } from "@mui/material";

const StudyPageCreate = () => {
  const { teamId } = useParams(); // Fetch teamId from the URL
  const numericTeamId = parseInt(teamId, 10);
  const { selectedBook } = useBook();

  const [userIds, setUserIds] = useState([]);
  const [reminds, setReminds] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    studyPageName: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const AlertDayOptions = [
    { label: "Monday", value: 0 },
    { label: "Tuesday", value: 1 },
    { label: "Wednesday", value: 2 },
    { label: "Thursday", value: 3 },
    { label: "Friday", value: 4 },
    { label: "Saturday", value: 5 },
    { label: "Sunday", value: 6 },
  ];

  // 사용자 ID 변경
  const handleUserIdChange = (index, value) => {
    const updatedUserIds = [...userIds]; // userIds 상태 사용
    updatedUserIds[index] = value;
    setUserIds(updatedUserIds);
  };

  const handleAddUser = () => {
    setUserIds([...userIds, ""]); // Add an empty field for a new user
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Handling reminder changes
  const handleRemindChange = (index, field, value) => {
    const updatedReminds = [...reminds];
    updatedReminds[index] = {
      ...updatedReminds[index],
      [field]: value,
    };
    setReminds(updatedReminds);
  };

  const handleAddRemind = () => {
    setReminds([...reminds, { dayType: "", timeAt: "", description: "" }]); // Add a new reminder object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("팀아이디");
    console.log(JSON.stringify(teamId));

    if (!selectedBook) {
      console.error("selectedBook 값이 설정되지 않았습니다.");
      return;
    }
    console.log("보내는 책 정보: " + JSON.stringify(selectedBook)); // 이 값이 제대로 설정되었는지 확인

    const studyPageDto = {
      bookDto: selectedBook,
      studyInfoDto: formData,
      reminds,
      userIds, // Include reminds in the payload
    };
    console.log(JSON.stringify(selectedBook));
    console.log(JSON.stringify(formData));
    console.log(JSON.stringify(reminds));
    console.log(JSON.stringify(userIds));


    try {
      console.log("저장 시작");
      await axios.post(`/api/${numericTeamId}/studyPage/create`, studyPageDto);
      console.log("Study page created successfully!");
    } catch (error) {
      console.error("Error creating study page:", error);
      setErrorMessage("An error occurred while creating the study page. Please try again.");
    }
  };

  return (
      <Container maxWidth="md">
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, backgroundColor: '#333', padding: '24px', borderRadius: '8px', boxShadow: 2, color: 'white' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create a New Study Page
          </Typography>
          {errorMessage && <Typography color="error">{errorMessage}</Typography>}

          {/* Study Page Name */}
          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
              <TextField
                  fullWidth
                  label="Study Page Name"
                  variant="outlined"
                  value={formData.studyPageName}
                  onChange={(e) => handleChange("studyPageName", e.target.value)}
                  required
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
              />
            </Grid2>

            {/* Start Date */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                  sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
              />
            </Grid2>

            {/* End Date */}
            <Grid2 item xs={12} sm={6}>
              <TextField
                  fullWidth
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true, style: { color: '#fff' } }}
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  required
                  sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
              />
            </Grid2>

            {/* Description */}
            <Grid2 item xs={12}>
              <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  InputLabelProps={{
                    style: { color: '#fff' },
                  }}
                  sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
              />
            </Grid2>

            {/* Users */}
            <Grid2 item xs={12}>
              <Typography variant="h6">Users</Typography>
              {userIds.map((userId, index) => (
                  <TextField
                      fullWidth
                      key={index}
                      label={`User ${index + 1}`}
                      value={userId}
                      onChange={(e) => handleUserIdChange(index, e.target.value)}
                      sx={{ mt: 1, input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
                  />
              ))}
              <Button onClick={handleAddUser} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Add User
              </Button>
            </Grid2>

            {/* Reminds */}
            <Grid2 item xs={12}>
              <Typography variant="h6">Reminds</Typography>
              {reminds.map((remind, index) => (
                  <Box key={index} sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel style={{ color: 'white' }}>Date Type</InputLabel>
                      <Select
                          value={remind.dayType}
                          onChange={(e) => handleRemindChange(index, "dayType", e.target.value)}
                          label="Date Type"
                          sx={{ color: 'white' }}
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
                        sx={{ mt: 2, input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        value={remind.description}
                        onChange={(e) => handleRemindChange(index, "description", e.target.value)}
                        sx={{ mt: 2, input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' } } }}
                    />
                  </Box>
              ))}
              <Button onClick={handleAddRemind} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Add Reminder
              </Button>
            </Grid2>

            {/* Submit Button */}
            <Grid2 item xs={12}>
              <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 3 }}>
                Create Study Page
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
  );
};

export default StudyPageCreate;