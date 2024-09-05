const JoinForm = () => {
   return (
     <div className='bg-white px-6 py-8 rounded-3xl border-2 border-gray-200 shadow-lg w-full max-w-xl'>
       <h2 className='text-3xl font-semibold mb-6'>회원가입</h2>
       <form className='flex flex-col gap-y-4'>
         
         {/* Row 1: ID and Nickname */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="id" className='text-base font-semibold block text-left'>아이디</label>
             <input 
               type="text" 
               id="id"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='아이디를 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="nickname" className='text-base font-semibold block text-left'>닉네임</label>
             <input 
               type="text" 
               id="nickname"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='닉네임을 입력하세요'
             />
           </div>
         </div>
 
         {/* Row 2: Password and Recheck Password */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="password" className='text-base font-semibold block text-left'>비밀번호</label>
             <input 
               type="password" 
               id="password"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='비밀번호를 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="confirm-password" className='text-base font-semibold block text-left'>비밀번호 재확인</label>
             <input 
               type="password" 
               id="confirm-password"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='비밀번호를 재확인하세요'
             />
           </div>
         </div>
 
         {/* Row 3: Name and Contact Information */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="name" className='text-base font-semibold block text-left'>이름</label>
             <input 
               type="text" 
               id="name"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='이름을 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="contact" className='text-base font-semibold block text-left'>연락처</label>
             <input 
               type="text" 
               id="contact"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='연락처를 입력하세요'
             />
           </div>
         </div>
 
         {/* Row 4: Email and Date of Birth */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="email" className='text-base font-semibold block text-left'>이메일</label>
             <input 
               type="email" 
               id="email"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='이메일을 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="birthdate" className='text-base font-semibold block text-left'>생년월일</label>
             <input 
               type="date" 
               id="birthdate"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
             />
           </div>
         </div>
 
         {/* Row 5: Address 1 and Address Search Button */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="address1" className='text-base font-semibold block text-left'>주소1</label>
             <input 
               type="text" 
               id="address1"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='주소1을 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px] flex items-end'>
             <button 
               type="button" 
               className='py-2 px-4 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition duration-300 w-full'
             >
               주소 검색
             </button>
           </div>
         </div>
 
         {/* Row 6: Address 2 and Address 3 */}
         <div className='flex flex-wrap gap-x-6 gap-y-4'>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="address2" className='text-base font-semibold block text-left'>주소2</label>
             <input 
               type="text" 
               id="address2"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='주소2를 입력하세요'
             />
           </div>
           <div className='flex-1 min-w-[180px]'>
             <label htmlFor="address3" className='text-base font-semibold block text-left'>주소3</label>
             <input 
               type="text" 
               id="address3"
               className='w-full border-2 border-gray-100 rounded-xl p-3 mt-1 bg-transparent'
               placeholder='주소3을 입력하세요'
             />
           </div>
         </div>
 
         {/* Row 7: Sign Up Button */}
         <div className='flex mt-8'>
           <button 
             type="submit" 
             className='w-full py-3 rounded-xl bg-violet-500 text-white text-lg font-bold hover:bg-violet-600 transition duration-300'
           >
             회원가입
           </button>
         </div>
       </form>
 
       <div className='mt-8 flex justify-center items-center'>
         <p className='font-semibold text-base'>이미 계정이 있으신가요?</p>
         <button className='text-violet-500 text-base font-bold ml-2'>로그인하러 가기</button>
       </div>
     </div>
   );
 };
 
 export default JoinForm;