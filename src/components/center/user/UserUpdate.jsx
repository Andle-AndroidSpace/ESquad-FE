import React, { useState, useEffect } from 'react';
import { useUser } from "../../form/UserContext.jsx"; // UserContext로부터 userInfo를 불러옴
import useAxios from '../../../hooks/useAxios.jsx'; // useAxios 훅 불러옴
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"; // 닉네임 중복체크용으로 Axios 사용

const UserUpdate = () => {
    const { userInfo } = useUser(); // UserContext에서 userInfo를 가져옴
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nickname: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
        address: ''
    });
    const [nicknameAvailable, setNicknameAvailable] = useState(null); // 닉네임 중복 체크 결과

    // 페이지 초기 로드 시 userInfo로 formData 업데이트
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

    // 입력 값 변경 시 formData 업데이트
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // 닉네임 중복 체크
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

    // useAxios를 사용해 PUT 요청을 처리
    const { data, error, loading, refetch } = useAxios({
        url: 'http://localhost:8080/api/users/update',
        method: 'PUT',
        body: formData,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // 폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // JWT 토큰을 로컬 스토리지에서 가져오기
        const token = localStorage.getItem('jwt'); // 'jwt'로 수정

        // 토큰이 없거나 유효하지 않은 경우 처리
        if (!token) {
            alert("로그인 후에 다시 시도해주세요.");
            return;
        }

        // 닉네임 중복 체크 확인
        if (nicknameAvailable === false) {
            alert("중복된 닉네임이 있습니다. 다른 닉네임을 입력해주세요.");
            return;
        }

        // Authorization 헤더에 토큰을 추가하여 refetch 호출
        refetch({
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
    };

    // 요청 중일 때 로딩 상태 처리
    if (loading) {
        return <div>Loading...</div>;
    }

    // 오류 처리
    if (error) {
        if (error.response && error.response.status === 401) {
            alert("인증이 만료되었거나 잘못된 토큰입니다. 다시 로그인 해주세요.");
            localStorage.removeItem('jwt'); // 로그아웃 처리 (필요한 경우)
        } else {
            alert(`회원 정보 수정에 실패했습니다. 오류: ${error.response?.status || "알 수 없는 오류"}`);
        }
    }

    // 성공적으로 데이터가 수정된 경우 처리
    if (data) {
        alert("회원 정보가 성공적으로 수정되었습니다!");
        window.location.href = "/profile";
    }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-900 pt-16'>
            <div className='bg-gray-800 px-6 sm:px-8 py-6 sm:py-8 rounded-3xl border-2 border-gray-700 shadow-lg w-full max-w-3xl'>
                <h2 className='text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center text-white'>회원정보 수정</h2>
                <form className='flex flex-col gap-y-3 sm:gap-y-5' onSubmit={handleSubmit}>
                    {/* 아이디 필드는 수정 불가능 */}
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

                    {/* 닉네임 필드 */}
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

                    {/* 이메일 필드 */}
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

                    {/* 연락처와 생년월일 */}
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

                    {/* 주소 */}
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

                    {/* 버튼 */}
                    <div className='flex justify-between mt-6 sm:mt-10'>
                        <Link to="/profile" className='w-full'>
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
