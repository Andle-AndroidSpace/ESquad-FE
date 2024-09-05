// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setIsLoggedIn }) => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleLogin = async (e) => {
      e.preventDefault();

      console.log({ username, password });

      try {
         const response = await axios.post('/loginProc', {
            username,
            password
         }, {
            withCredentials: true
         });
         console.log("서버 응답:", response.data);

         if (response.data.success) {
            localStorage.setItem('isLoggedIn', 'true');
            setIsLoggedIn(true);
            navigate('/');
            alert("로그인 성공")
         } else {
            alert(response.data.message || '로그인에 실패했습니다.');
         }
      } catch (error) {
         console.error("로그인 실패", error);
         alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      }
   };

   return (
       <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
          <h2 className='text-5xl font-semibold'>다시 만나서 반가워요</h2>
          <form onSubmit={handleLogin} className='mt-8'>
             <div className='text-left mt-4'>
                <label
                    htmlFor="username"
                    className='text-lg font-semibold'>아이디</label>
                <input
                    type="text"
                    id="username"
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='아이디를 입력하세요'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
             </div>
             <div className='text-left mt-4'>
                <label
                    htmlFor="password"
                    className='text-lg font-semibold'>비밀번호</label>
                <input
                    type="password"
                    id="password"
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='비밀번호를 입력하세요'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="off"
                />
             </div>
             <div className='mt-8 flex justify-between items-center'>
                <div>
                   <input
                       type='checkbox'
                       id="remember"
                   />
                   <label
                       htmlFor="remember"
                       className='ml-2 font-semibold text-base'
                   >30일 동안 기억하기</label>
                </div>
             </div>
             <div className='mt-8 flex flex-row items-center justify-center'>
                <button type="button" className='font-semibold text-base text-violet-500 mx-3'>아이디를 잊어버렸나요?</button>
                <button type="button" className='font-semibold text-base text-violet-500 mx-3'>패스워드를 잊어버렸나요?</button>
             </div>
             <div className='mt-8 flex flex-col gap-y-4'>
                <button type="submit" className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'>로그인</button>
                <button type="button" className='flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'>
                   <FcGoogle />
                   구글로 로그인</button>
             </div>
          </form>
          <div className='mt-8 flex justify-center items-center'>
             <p className='font-semibold text-base'>아직 계정을 안만들었다구요?</p>
             <Link to="/join"><button className='text-violet-500 text-base font-bold ml-2'>가입하러 가기</button></Link>
          </div>
       </div>
   );
}

export default LoginForm;
