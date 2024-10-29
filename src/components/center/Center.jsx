import { Route, Routes } from "react-router-dom";
import StudyPageRead from "./study/StudyPageRead.jsx";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import StudyPageInfo from "./study/StudyPageInfo.jsx";
import BookSearch from "./book/BookSearch.jsx";
import BookInfo from "./book/BookInfo.jsx";
import BookProvider from "./book/BookProvider.jsx";
import StudyPageCreate from "./study/StudyPageCreate.jsx";
import MenuLink from "../leftbar/MenuLink.jsx";

const Center = () => {
    return (
        <BookProvider>
            <Routes>
                <Route path="/pages/memo" element={<Note/>}/>
                <Route path="/board/questions" element={<Qboard/>}/>

                <Route path="/book/search" element={<BookSearch/>}/>
                <Route path="/book/info/:isbn" element={<BookInfo/>}/>

                <Route path="/:teamId/study-pages" element={<StudyPageRead/>}/>
                <Route path='/:teamId/study-pages/create' element={<StudyPageCreate/>}/>
                <Route path='/:teamId/study-pages/:studyId' element={<StudyPageInfo/>}/>
            </Routes>
        </BookProvider>
    );
}

export default Center;
