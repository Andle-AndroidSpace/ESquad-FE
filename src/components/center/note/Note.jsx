import React, { useState } from 'react';
import { FaSave, FaTrash } from 'react-icons/fa';

const NoteContent = () => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');

   const handleSave = () => {
       // Logic to save the note
       console.log('Note saved:', { title, content });
   };

   const handleClear = () => {
       setTitle('');
       setContent('');
   };

   return (
       <div className="p-4 bg-gray-800 text-white rounded-lg shadow-md">
           <h2 className="text-2xl font-bold mb-4">Create a Note</h2>
           <div className="mb-4">
               <input
                   type="text"
                   placeholder="Note Title"
                   value={title}
                   onChange={(e) => setTitle(e.target.value)}
                   className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
           </div>
           <div className="mb-4">
               <textarea
                   placeholder="Note Content"
                   value={content}
                   onChange={(e) => setContent(e.target.value)}
                   className="w-full p-2 bg-gray-700 text-white rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
           </div>
           <div className="flex justify-between">
               <button
                   onClick={handleSave}
                   className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
               >
                   <FaSave className="mr-2" />
                   Save Note
               </button>
               <button
                   onClick={handleClear}
                   className="flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md"
               >
                   <FaTrash className="mr-2" />
                   Clear
               </button>
           </div>
       </div>
   );
};
export default NoteContent;