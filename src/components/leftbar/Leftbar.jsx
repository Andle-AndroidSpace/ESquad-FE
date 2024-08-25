import React from 'react';
import MenuContainer from "./MenuContainer.jsx";
import PersonalAccount from './PersonalAccount.jsx';
import Teams from "./Teams.jsx";

const Leftbar = () => {
    return (
        
        <>
            <div className="flex-1 flex-col bg-gray-800">
                <Teams/>
            </div>

            <div className="flex-4 flex flex-col">
                <MenuContainer />
                <PersonalAccount />
            </div>
        </>
    );
};

export default Leftbar;