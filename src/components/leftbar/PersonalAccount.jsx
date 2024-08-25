import { FaCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import profile from "../../img/img2.png";

const PersonalAccount = () => {

   const userMock = {
      user_id: "idididi",
      nickname: "niek",
      img: {profile}
   }

   return ( 
      <div className="h-20 mt-auto p-4 flex items-center space-x-4 bg-gray-800 rounded-md">
         <img 
            src={userMock.profile}
            alt="profile" 
            className="w-10 h-10 rounded-full"
         />
         <div className="flex-1">
            <p className="text-white font-semibold text-lg">{userMock.user_id}</p>
            <p className="text-gray-400 text-sm">{userMock.nickname}</p>
         </div>
         <div className="flex space-x-2">
            <button className="text-gray-400 hover:text-white">
               <FaCog className="w-5 h-5"/>
            </button>
            <button className="text-gray-400 hover:text-white">
               <RiLogoutCircleRLine className="w-5 h-5" />
            </button>
         </div>
      </div>
            
   );
}
 
export default PersonalAccount;