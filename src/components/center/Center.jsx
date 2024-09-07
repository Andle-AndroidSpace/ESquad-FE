import { Route, Routes } from "react-router-dom";
import Study from "../../pages/study/Study";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import Search from "./search/Search";
import StudyPage from "./study/StudyPage";
import QuestionDetail from "./qboard/QuestionDetail.jsx";

const Center = () => {
    return (
        <Routes>
            <Route path="/pages/memo" element={<Note />} />
            <Route path="/board/questions" element={<Qboard />} />  {/* 질문 목록 페이지 */}
            <Route path="/board/questions/:id" element={<QuestionDetail />} />  {/* 질문 상세 페이지 */}
            <Route path="/pages/search" element={<Search />} />
            <Route path="/pages/studypages" element={<Study />} />
            <Route path='/pages/studypages/:no' element={<StudyPage />} />
        </Routes>
    );
}

export default Center;
