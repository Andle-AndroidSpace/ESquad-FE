import { Route, Routes } from "react-router-dom";
import Study from "../../pages/study/Study";
import Note from "./note/Note";
import Qboard from "./qboard/Qboard";
import Search from "./search/Search";
import StudyPage from "./study/StudyPage";

const Center = () => {
   return ( 
      <Routes>
         {/* <Route path="/user/profie" element={} /> */}
         <Route path="/pages/memo" element={<Note />} />
         <Route path="/pages/question" element={<Qboard />} />
         <Route path="/pages/search" element={<Search />} />
         <Route path="/pages/studypages" element={<Study />} />
         <Route path='/pages/studypages/:no' element={<StudyPage />} />
      </Routes>
   );
}
 
export default Center;