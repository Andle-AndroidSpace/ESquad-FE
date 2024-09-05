// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const LoginForm = ({ setIsLoggedIn }) => {
   const [user, setUser] = useState({
      username: '',
      password: '',
   });
   const navigate = useNavigate();

   const handleChange =  (e) => {
      const { name, value } = e.target;
      setUser({ ...user, [name]: value });
   };

   const handleLogin = async (e) => {
      e.preventDefault();

      if (!user.username.trim() || !user.password.trim()) {
         alert('아이디와 비밀번호를 모두 입력해 주세요.');
         return;
      }

         const formData = new FormData();
         formData.append('username', user.username);
         formData.append('password', user.password);

         const response =  await axios ({
            url: '/loginProc',
            method: 'POST',
            data: formData,
            withCredentials: true
         });

         if (response.status === 200) {
            alert('로그인 성공!')
            setIsLoggedIn(true);
            navigate('/');
         } else {
            alert('로그인 실패')
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
                    name="username"
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='아이디를 입력하세요'
                    value={user.username}
                    onChange={handleChange}
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
                    name="password"
                    className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                    placeholder='비밀번호를 입력하세요'
                    value={user.password}
                    onChange={handleChange}
                    required
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
