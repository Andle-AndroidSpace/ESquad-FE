import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const FindPassword = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [verificationNumber, setVerificationNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        setErrorMessage('');
    }, [step]);

    const handleSendEmail = async () => {
        setErrorMessage('')
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/recover-password', { email, username });
            alert("비밀번호 재설정 인증번호가 이메일로 발송되었습니다.");
            setStep(2);
        } catch (error) {
            setErrorMessage('이메일 전송 실패: ' + error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyNumberAndResetPassword = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/verify-password', {
                email,
                number: verificationNumber,
                newPassword,
                confirmPassword
            });
            alert("비밀번호가 성공적으로 재설정되었습니다.");
            setErrorMessage('');
            setStep(3);
        } catch (error) {
            setErrorMessage('비밀번호 재설정 실패: ' + error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-screen">
            <div className='w-full flex items-center justify-center lg:w-1/2'>
                <div className='bg-white px-40 py-48 rounded-3xl border-2 border-gray-200'>
                    {step === 1 && (
                        <div>
                            <h2 className='text-5xl font-semibold'>비밀번호 찾기</h2>
                            <div className='mt-8'>
                                <label htmlFor="email" className='text-lg font-semibold'>이메일 주소</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='이메일 주소를 입력하세요'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="username" className='text-lg font-semibold'>아이디</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='아이디를 입력하세요'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                onClick={handleSendEmail}
                                className='mt-8 w-full py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                            >
                                {loading ? '이메일 전송 중...' : '인증번호 전송하기'}
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div>
                            <h2 className='text-5xl font-semibold'>비밀번호 재설정</h2>
                            <div className='mt-8'>
                                <label htmlFor="verificationNumber" className='text-lg font-semibold'>인증번호 입력</label>
                                <input
                                    type="text"
                                    id="verificationNumber"
                                    name="verificationNumber"
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='인증번호를 입력하세요'
                                    value={verificationNumber}
                                    onChange={(e) => setVerificationNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="newPassword" className='text-lg font-semibold'>새 비밀번호</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='새 비밀번호를 입력하세요'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='mt-4'>
                                <label htmlFor="confirmPassword" className='text-lg font-semibold'>비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                                    placeholder='비밀번호를 다시 입력하세요'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                onClick={handleVerifyNumberAndResetPassword}
                                className='mt-8 w-full py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                            >
                                {loading ? '비밀번호 재설정 중...' : '비밀번호 재설정하기'}
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className='text-5xl font-semibold'>비밀번호 재설정 성공</h2>
                            <div className='mt-8'>
                                <p className='text-lg font-semibold'>비밀번호가 성공적으로 재설정되었습니다.</p>
                            </div>
                            <Link to="/login">
                                <button
                                    className='mt-8 w-full py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                                >
                                    로그인하러 가기
                                </button>
                            </Link>
                        </div>
                    )}

                    {errorMessage && (
                        <div className='mt-4 text-red-500'>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
            <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
                <div className='w-60 h-60 bg-gradient-to-tr from-violet-500 to-pink-500 rounded-full animate-bounce'/>
                <div className="w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg"/>
            </div>
        </div>
    );
};

export default FindPassword;
