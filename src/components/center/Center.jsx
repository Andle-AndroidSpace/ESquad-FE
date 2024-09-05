import {Route, Routes} from "react-router-dom";
import Study from "../../pages/study/Study";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import StudyPage from "./study/StudyPage";
import BookSearch from "./search/BookSearch.jsx";
import BookInfo from "./search/BookInfo.jsx";
import BookProvider from "./search/BookProvider.jsx";

const Center = () => {

    return (
        <BookProvider>
            <Routes>
                <Route path="/pages/memo" element={<Note/>}/>
                <Route path="/pages/question" element={<Qboard/>}/>
                <Route path="/book/search" element={<BookSearch/>}/>
                <Route path="/book/:isbn" element={<BookInfo/>}/>
                <Route path="/pages/studypages" element={<Study/>}/>
                <Route path='/pages/studypages/:no' element={<StudyPage/>}/>
            </Routes>
        </BookProvider>
    );
}

export default Center;