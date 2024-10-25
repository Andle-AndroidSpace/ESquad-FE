import React, { useEffect, useState } from 'react';
import { useUser } from "../../form/Inquiry.jsx";
import { Link } from "react-router-dom";

const UserInquiry = () => {
    const { userInfo } = useUser();
    const [userData, setUserData] = useState({
        username: '',
        nickname: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
        address: ''
    });

    useEffect(() => {
        if (userInfo) {
            setUserData({
                username: userInfo.username || '',
                nickname: userInfo.nickname || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                birthDay: userInfo.birthDay || '',
                address: userInfo.address || ''
            });
        }
    }, [userInfo]);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 pt-16'>
            <div className='bg-gray-800 px-6 sm:px-8 py-6 sm:py-8 rounded-3xl border-2 border-gray-700 shadow-lg w-full max-w-3xl'>
                <h2 className='text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white'>내 정보</h2>
                <div className='flex flex-col gap-y-3 sm:gap-y-5'>
                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>아이디</label>
                            <input
                                type='text'
                                value={userData.username}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>닉네임</label>
                            <input
                                type='text'
                                value={userData.nickname}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>이메일</label>
                            <input
                                type='text'
                                value={userData.email}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>연락처</label>
                            <input
                                type='text'
                                value={userData.phoneNumber}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>생년월일</label>
                            <input
                                type='date'
                                value={userData.birthDay}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label className='text-base font-semibold block text-left text-gray-300'>주소</label>
                            <input
                                type='text'
                                value={userData.address}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex justify-between mt-6 sm:mt-10'>
                        <Link to="/user/update" className='w-full mr-2'>
                            <button
                                className='w-full py-2 sm:py-3 rounded-xl bg-blue-500 text-white text-base font-bold hover:bg-blue-600 transition duration-300'>
                                회원정보 수정
                            </button>
                        </Link>
                        <Link to="/user/profile" className='w-full ml-2'>
                            <button
                                className='w-full py-2 sm:py-3 rounded-xl bg-green-500 text-white text-base font-bold hover:bg-green-600 transition duration-300'>
                                확인
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInquiry;
