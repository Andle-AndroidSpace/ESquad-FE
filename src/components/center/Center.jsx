import { Route, Routes } from "react-router-dom";
import StudyRead from "./study/StudyRead.jsx";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import StudyPage from "./study/StudyPage";
import BookSearch from "./book/BookSearch.jsx";
import BookInfo from "./book/BookInfo.jsx";
import BookProvider from "./book/BookProvider.jsx";
import StudyPageCreate from "./study/StudyPageCreate.jsx";

const Center = () => {
    return (
        <BookProvider>
            <Routes>
                <Route path="/pages/memo" element={<Note/>}/>
                <Route path="/board/questions" element={<Qboard/>}/>
                <Route path="/book/search" element={<BookSearch/>}/>
                <Route path="/book/info/:isbn" element={<BookInfo/>}/>
                <Route path="/:teamId/study-pages" element={<StudyRead/>}/>
                <Route path='/pages/study-pages/:no' element={<StudyPage/>}/>
                <Route path='/:teamId/study-pages/create' element={<StudyPageCreate/>}/>
            </Routes>
        </BookProvider>
    );
}

export default Center;
