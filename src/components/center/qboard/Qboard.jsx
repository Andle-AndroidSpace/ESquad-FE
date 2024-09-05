import React from 'react';
import CreateQuestion from "./NewQuestion.jsx";
import QuestionList from "./QuestionList.jsx";


const Qboard = () => {
    return (
        <main className="flex-col flex-grow bg-gray-900 text-white h-full">
            <CreateQuestion />
            <QuestionList />
        </main>
    );
};

export default Qboard;