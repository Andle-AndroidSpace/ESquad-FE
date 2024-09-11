import { useState } from "react";
import axios from "axios";
import { useBook } from "../search/BookProvider.jsx";

const StudyPageCreate = () => {
  // const { teamId } = useParams(); // Fetch teamId from the URL
  const teamId =100 // Fetch teamId from the URL
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
    setFormData(prevState => ({
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
    setReminds([...reminds, { dateType: "", timeAt: "", description: "" }]); // Add a new reminder object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studyPageDto = {
      bookDto: selectedBook,
      studyInfoDto: formData,
      reminds,
      userIds,// Include reminds in the payload
    };

    try {
      const response = await axios.post(`/api/100/studyPage/create`, studyPageDto);
      alert(`Study page created successfully! ${response.data}`);
    } catch (error) {
      console.error("Failed to create study page", error);
      setErrorMessage("An error occurred while creating the study page. Please try again.");
    }
  };

  return (
      <div className="p-4 bg-gray-900 text-white min-h-screen flex justify-center">
        <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-3xl font-bold mb-4">Create a New Study Page</h2>
            {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

            <div className="mb-4">
              <label className="block text-sm mb-2">Study Page Name</label>
              <input
                  type="text"
                  value={formData.studyPageName}
                  onChange={(e) => handleChange("studyPageName", e.target.value)}
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Start Date</label>
              <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">End Date</label>
              <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Description</label>
              <textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Users</h3>
              {userIds.map((userId, index) => (
                  <div key={index} className="flex items-center mb-2">
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => handleUserIdChange(index, e.target.value)}
                        placeholder="Enter User ID"
                        className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
              ))}
              <button
                  type="button"
                  onClick={handleAddUser}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg mt-2"
              >
                Add User
              </button>
            </div>

            <div className="mb-4">
              <h3 className="text-xl font-semibold">Reminds</h3>
              {reminds.map((remind, index) => (
                  <div key={index} className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter Date Type"
                        value={remind.dateType}
                        onChange={(e) => handleRemindChange(index, "dateType", e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                    />
                    <input
                        type="time"
                        placeholder="Enter Time"
                        value={remind.timeAt}
                        onChange={(e) => handleRemindChange(index, "timeAt", e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Enter Description"
                        value={remind.description}
                        onChange={(e) => handleRemindChange(index, "description", e.target.value)}
                        className="w-full p-2 bg-gray-700 text-white rounded"
                    />
                  </div>
              ))}
              <button
                  type="button"
                  onClick={handleAddRemind}
                  className="w-full py-2 bg-blue-500 text-white rounded-lg mt-2"
              >
                Add Reminder
              </button>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Create Study Page
            </button>
          </form>
        </div>
      </div>
  );
};

export default StudyPageCreate;
