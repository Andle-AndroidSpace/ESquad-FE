import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuLink from './MenuLink';

const MenuContainer = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleBookSearch = (e) => {
        e.preventDefault();
        navigate(`/book/search?query=${encodeURIComponent(searchQuery)}`);
    };

    return (

        // menuContainer
        <div className="h-menu-c p-2 space-y-4 m-2 ">

            <div className="relative flex justify-center">
                <h3 className="text-center text-lg">팀스페이스명</h3>
            </div>

            {/* Search */}
            <div className="relative flex items-center max-w-xs">
                <form onSubmit={handleBookSearch} className="w-full">
                    <input
                        type="text"
                        placeholder="찾고 싶은 도서는?"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </form>
            </div>

            {/* Menu List */}
            <div className="space-y-2 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
                <MenuLink link={"/pages/memo"} menu="메모" />
                <MenuLink link={"/pages/question"} menu="질문" />
                <MenuLink link={"/studypage"} menu="스터디룸" />
            </div>

        </div>
    );
};

export default MenuContainer;