import { FaCog } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import React from 'react';
import profile from "../../img/img2.png";
import {useUser} from "../form/Inquiry.jsx";


const PersonalAccount = () => {
    const navigate = useNavigate();
    const {userInfo} = useUser();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        alert("로그아웃 되었습니다. 다음에 또 만나요!")
        navigate('/login');
    };

    return (
        <div className="h-20 mt-auto p-4 flex items-center space-x-4 bg-gray-800 rounded-md w-[300px]">
            <img
                src={profile}
                alt="profile"
                className="w-10 h-10 rounded-full"
            />
            <div className="flex-1">
                <p className="text-white font-semibold text-lg">{userInfo?.username || '로딩 중...'}</p>
                <p className="text-gray-400 text-sm">{userInfo?.nickname || '로딩 중...'}</p>
            </div>
            <div className="flex space-x-4 ml-auto">
                <button className="text-gray-400 hover:text-white">
                    <FaCog className="w-5 h-5"/>
                </button>
                <button className="text-gray-400 hover:text-white" onClick={handleLogout}>
                    <RiLogoutCircleRLine className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}

export default PersonalAccount;
