import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PasswordUpdate = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
    });

    // 입력 필드 변경 핸들러
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('jwt'); // JWT 토큰 가져오기

        if (!token) {
            alert('로그인 후에 시도해주세요.');
            return;
        }

        try {
            const response = await axios.put(
                'http://localhost:8080/api/users/password',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다!');
                navigate('/profile'); // 성공 시 프로필 페이지로 이동
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('인증이 만료되었습니다. 다시 로그인해주세요.');
                localStorage.removeItem('jwt'); // 로그아웃 처리
                navigate('/login'); // 로그인 페이지로 이동
            } else {
                alert(`비밀번호 변경에 실패했습니다.`);
            }
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 pt-16'>
            <div className='bg-gray-800 px-6 sm:px-8 py-6 sm:py-8 rounded-3xl border-2 border-gray-700 shadow-lg w-full max-w-lg'>
                <h2 className='text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white'>비밀번호 변경</h2>
                <form className='flex flex-col gap-y-3 sm:gap-y-5' onSubmit={handleSubmit}>
                    {/* 현재 비밀번호 입력 */}
                    <div>
                        <label htmlFor='currentPassword' className='text-base font-semibold block text-left text-gray-300'>
                            현재 비밀번호
                        </label>
                        <input
                            type='password'
                            id='currentPassword'
                            value={formData.currentPassword}
                            onChange={handleChange}
                            required
                            className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                        />
                    </div>

                    {/* 새 비밀번호 입력 */}
                    <div>
                        <label htmlFor='newPassword' className='text-base font-semibold block text-left text-gray-300'>
                            새 비밀번호
                        </label>
                        <input
                            type='password'
                            id='newPassword'
                            value={formData.newPassword}
                            onChange={handleChange}
                            required
                            className='w-full border-2 border-gray-600 rounded-xl p-2 sm:p-3 mt-1 bg-gray-700 text-white'
                        />
                    </div>

                    {/* 버튼들 */}
                    <div className='flex justify-between mt-6 sm:mt-10'>
                        <button
                            type='button'
                            onClick={() => navigate('/profile')}
                            className='w-full py-2 sm:py-3 rounded-xl bg-red-500 text-white text-base font-bold hover:bg-red-600 transition duration-300'>
                            취소
                        </button>
                        <button
                            type='submit'
                            className='w-full py-2 sm:py-3 rounded-xl bg-violet-500 text-white text-base font-bold hover:bg-violet-600 transition duration-300 ml-4'>
                            비밀번호 변경
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordUpdate;
