import React, { useEffect } from 'react';
import { useUser } from "../../form/Inquiry.jsx";
import {Link, useNavigate} from "react-router-dom";

const UserProfilePage = () => {
    const { userInfo, refetch } = useUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('jwt');
        alert("로그아웃 되었습니다. 다음에 또 만나요!")
        navigate('/login');
    };

    useEffect(() => {
        if (!userInfo) {
            refetch();
        }
    }, [userInfo, refetch]);

    if (!userInfo) {
        return <div className="text-white">로딩 중...</div>;
    }



    return (
        <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 pt-16">
            <h1 className="text-3xl font-bold text-white mb-8">마이페이지</h1>

            <div className="bg-gray-800 px-8 py-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <img
                        src={userInfo.profileImage || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="rounded-full w-24 h-24"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">닉네임: {userInfo.nickname}</h2>
                <h4 className="text-lg text-gray-400 mb-2">이메일: {userInfo.email}</h4>
                <div className="flex justify-center mt-8">
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600" onClick={handleLogout}>
                        로그아웃
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 px-8 py-6 rounded-lg shadow-lg w-full max-w-md mt-8">
                <h3 className="text-xl font-bold text-white mb-6">계정 관리</h3>

                <div className="flex flex-col gap-4">
                    <div>
                        <h4 className="text-lg font-bold text-gray-300 mb-2">내 정보 보기</h4>
                        <Link to="/user/inquiry">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                                내 정보
                            </button>
                        </Link>
                    </div>


                    <div>
                        <h4 className="text-lg font-bold text-gray-300 mb-2">회원정보 수정하기</h4>
                        <Link to="/user/update">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                                회원정보 수정
                            </button>
                        </Link>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold text-gray-300 mb-2">비밀번호 수정하기</h4>
                        <Link to="/user/password">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                                비밀번호 수정
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
