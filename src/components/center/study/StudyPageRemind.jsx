import { useState } from "react";

const RemindPage = ({ onSave }) => {
  const [remind, setRemind] = useState({
    dateType: "",
    timeAt: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRemind((prevRemind) => ({
      ...prevRemind,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(remind);  // 부모 컴포넌트에 리마인더 정보 전달
    setRemind({ dateType: "", timeAt: "", description: "" }); // 입력 필드 초기화
  };

  return (
      <div className="p-4 bg-gray-900 text-white min-h-screen flex justify-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-3xl font-bold mb-4">Add a Reminder</h2>

            <div className="mb-4">
              <label className="block text-sm mb-2">Date Type</label>
              <input
                  type="text"
                  name="dateType"
                  value={remind.dateType}
                  onChange={handleChange}
                  placeholder="Enter Date Type"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Time At</label>
              <input
                  type="time"
                  name="timeAt"
                  value={remind.timeAt}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Description</label>
              <textarea
                  name="description"
                  value={remind.description}
                  onChange={handleChange}
                  placeholder="Enter Reminder Description"
                  required
                  className="w-full p-2 bg-gray-700 text-white rounded"
              />
            </div>

            <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300"
            >
              Save Reminder
            </button>
          </form>
        </div>
      </div>
  );
};

export default RemindPage;
