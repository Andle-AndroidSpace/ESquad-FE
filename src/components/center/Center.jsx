import { Route, Routes } from "react-router-dom";
import Study from "../../pages/study/Study";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import Search from "./search/Search";
import StudyPage from "./study/StudyPage";
import UserUpdate from "./user/UserUpdate";
import Profile from "./user/Profile.jsx"
import GetUser from "./user/UserInquiry.jsx";
import UserPasswordUpdate from "./user/UserPasswordUpdate.jsx";
import UserInquiry from "./user/UserInquiry.jsx";



const Center = () => {
    return (
        <Routes>
            {/* <Route path="/user/profie" element={} /> */}
            <Route path="/pages/memo" element={<Note />} />
            <Route path="/board/questions" element={<Qboard />} />
            <Route path="/pages/search" element={<Search />} />
            <Route path="/pages/studypages" element={<Study />} />
            <Route path='/pages/studypages/:no' element={<StudyPage />} />
            <Route path="/user/update" element={<UserUpdate />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/inquiry" element={<UserInquiry />} />
            <Route path="/user/password" element={<UserPasswordUpdate />} />
        </Routes>
    );
}

export default Center;
