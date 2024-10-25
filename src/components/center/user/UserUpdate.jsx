import React, { useState, useEffect } from 'react';
import { useUser } from "../../form/Inquiry.jsx";
import useAxios from '../../../hooks/useAxios.jsx';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

const UserUpdate = () => {
    const { userInfo } = useUser();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
        address: ''
    });
    const [nicknameAvailable, setNicknameAvailable] = useState(null);
    useEffect(() => {
        if (userInfo) {
            setFormData({
                nickname: userInfo.nickname || '',
                email: userInfo.email || '',
                phoneNumber: userInfo.phoneNumber || '',
                birthDay: userInfo.birthDay || '',
                address: userInfo.address || ''
            });
        }
    }, [userInfo]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleNicknameCheck = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/users/usernamecheck`, {
                params: { username: formData.nickname }
            });
            const { available } = response.data;
            setNicknameAvailable(available);
            if (available) {
                alert("사용 가능한 닉네임입니다.");
            } else {
                alert("이미 사용 중인 닉네임입니다.");
            }
        } catch (error) {
            console.error("닉네임 중복 체크 오류:", error);
            alert("닉네임 중복 체크에 실패했습니다.");
        }
    };

    const { data, error, loading, refetch } = useAxios({
        url: 'http://localhost:8080/api/users/update',
        method: 'PUT',
        body: formData,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt');

        if (!token) {
            alert("로그인 후에 다시 시도해주세요.");
            return;
        }

        if (nicknameAvailable === false) {
            alert("중복된 닉네임이 있습니다. 다른 닉네임을 입력해주세요.");
            return;
        }

        refetch({
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        if (error.response && error.response.status === 401) {
            alert("인증이 만료되었거나 잘못된 토큰입니다. 다시 로그인 해주세요.");
            localStorage.removeItem('jwt'); // 로그아웃 처리 (필요한 경우)
        } else {
            alert(`회원 정보 수정에 실패했습니다. 오류: ${error.response?.status || "알 수 없는 오류"}`);
        }
    }

    if (data) {
        alert("회원 정보가 성공적으로 수정되었습니다!");
        window.location.href = "/user/profile";
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 pt-16'>
            <div className='bg-gray-800 px-6 sm:px-8 py-6 sm:py-8 rounded-3xl border-2 border-gray-700 shadow-lg w-full max-w-3xl'>
                <h2 className='text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white'>회원정보 수정</h2>
                <form className='flex flex-col gap-y-3 sm:gap-y-5' onSubmit={handleSubmit}>
                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='username' className='text-base font-semibold block text-left text-gray-300'>
                                아이디
                            </label>
                            <input
                                type='text'
                                id='username'
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                                value={userInfo?.username || ''}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='nickname' className='text-base font-semibold block text-left text-gray-300'>
                                닉네임
                            </label>
                            <input
                                type='text'
                                id='nickname'
                                value={formData.nickname}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                            />
                            <button
                                type='button'
                                onClick={handleNicknameCheck}
                                className='mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'>
                                닉네임 중복 체크
                            </button>
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='email' className='text-base font-semibold block text-left text-gray-300'>
                                이메일
                            </label>
                            <input
                                type='email'
                                id='email'
                                value={formData.email}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='phoneNumber'
                                   className='text-base font-semibold block text-left text-gray-300'>
                                연락처
                            </label>
                            <input
                                type='text'
                                id='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                            />
                        </div>

                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='birthDay' className='text-base font-semibold block text-left text-gray-300'>
                                생년월일
                            </label>
                            <input
                                type='date'
                                id='birthDay'
                                value={formData.birthDay}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                            />
                        </div>
                    </div>

                    <div className='flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-3 sm:gap-y-5'>
                        <div className='flex-1 min-w-[180px] sm:min-w-[220px]'>
                            <label htmlFor='address' className='text-base font-semibold block text-left text-gray-300'>
                                주소
                            </label>
                            <input
                                type='text'
                                id='address'
                                value={formData.address}
                                onChange={handleChange}
                                className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                            />
                        </div>
                    </div>

                    <div className='flex justify-between mt-6 sm:mt-10'>
                        <Link to="/user/profile" className='w-full'>
                            <button
                                type='button'
                                className='w-full py-2 sm:py-3 rounded-xl bg-red-500 text-white text-base font-bold hover:bg-red-600 transition duration-300'>
                                취소
                            </button>
                        </Link>
                        <button
                            type='submit'
                            className='w-full py-2 sm:py-3 rounded-xl bg-violet-500 text-white text-base font-bold hover:bg-violet-600 transition duration-300 ml-4'>
                            회원정보 수정
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserUpdate;
