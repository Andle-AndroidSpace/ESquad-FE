import React from 'react';
import { FcGoogle } from "react-icons/fc";


const LoginForm = () => {
   return ( 
      <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
         <h2 className='text-5xl font-semibold'>다시 만나서 반가워요</h2>
         <div className='mt-8'>
            <div className='text-left mt-4'>
               <label
                  htmlFor=""
                  className='text-lg font-semibold'>아이디</label>
               <input 
                  type="text" 
                  className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='아이디를 입력하세요'
                  />
            </div>
            <div className='text-left mt-4'>
               <label
                  htmlFor=""
                  className='text-lg font-semibold'>비밀번호</label>
               <input 
                  type="password" 
                  className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='비밀번호를 입력하세요'
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
               <button className='font-semibold text-base text-violet-500 mx-3'>아이디를 잊어버렸나요?</button>
               <button className='font-semibold text-base text-violet-500 mx-3'>패스워드를 잊어버렸나요?</button>
            </div>
            <div className='mt-8 flex flex-col gap-y-4'>
               <button className='active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold'>로그인</button>
               <button className='flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all'>
                  <FcGoogle />
                  구글로 로그인</button>
            </div>
         </div>
         <div className='mt-8 flex justify-center items-center'>
            <p className='font-semibold text-base'>아직 계정을 안만들었다구요?</p>
            <button className='text-violet-500 text-base font-bold ml-2'>가입하러 가기</button>
         </div>
      </div>
    );
}
 

export default LoginForm;