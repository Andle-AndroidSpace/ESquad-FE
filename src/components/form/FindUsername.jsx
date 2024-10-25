import React, {useState, useEffect}from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FindUsername = () => {
    const [email, setEmail] = useState('');
    const [verificationNumber, setVerificationNumber] = useState('');
    const [maskedUsername, setMaskedUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    useEffect(() => {
        setErrorMessage('');
    }, [step]);

    const handleSendEmail = async () => {
        setLoading(true);
        try {
            await axios.post('http://localhost:8080/api/users/recover-username', { email });
            alert("인증번호가 이메일로 발송되었습니다.");
            setStep(2);
        } catch (error) {
            setErrorMessage('이메일 전송 실패: ' + error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyNumber = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/users/verify-username', { email, number: verificationNumber });
            if (response.data) {
                setMaskedUsername(response.data);
                setStep(3);
            }
        } catch (error) {
            setErrorMessage('인증 실패: ' + error.response?.data?.message || error.message);
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
                            <h2 className='text-5xl font-semibold'>아이디 찾기</h2>
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
                            <h2 className='text-5xl font-semibold'>아이디 찾기</h2>
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
                            <button
                                onClick={handleVerifyNumber}
                                className='mt-8 w-full py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'
                            >
                                {loading ? '인증 중...' : '아이디 찾기'}
                            </button>
                        </div>
                    )}

                    {step === 3 && (
                        <div>
                            <h2 className='text-5xl font-semibold'>아이디 찾기</h2>
                            <div className='mt-8'>
                                <p className='text-lg font-semibold'>당신의 아이디: <span className='font-bold'>{maskedUsername}</span></p>
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

export default FindUsername;
