import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {Link, useParams} from 'react-router-dom';
import LiveStreamWindow from '../../../pages/stream/LiveStreamWindow.jsx';
import axios from "axios";

function openLiveStreamWindow(studyId) {
    const liveStreamWindow = window.open("", "Live Stream", "width=800,height=600");

    const rootElement = liveStreamWindow.document.createElement('div');
    liveStreamWindow.document.body.appendChild(rootElement);

    const root = createRoot(rootElement);
    root.render(<LiveStreamWindow studyId={studyId} />);

    const styleTag = liveStreamWindow.document.createElement('style');
    styleTag.innerHTML = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    `;
    liveStreamWindow.document.head.appendChild(styleTag);

    liveStreamWindow.moveTo(
        window.screen.width / 2 - 400,
        window.screen.height / 2 - 300
    );
}

// eslint-disable-next-line react/prop-types
const StudyPageRead = () => {
    const [studies, setStudies] = useState([]); // 스터디 페이지 저장용
    const [searchQuery, setSearchQuery] = useState(''); // 스터디 페이지 검색용
    const [currentPage, setCurrentPage] = useState(1); // 스터디 페이지 목록 페이지 관리
    const [loading, setLoading] = useState(false); // 데이터 로딩
    const [error, setError] = useState(false); // 데이터 로딩 중 에러
    const notitle = "hi";

    const { teamId } = useParams();
    const numericTeamId = parseInt(teamId, 10);

    useEffect(() => {
        console.log(teamId);
        console.log(numericTeamId);

        // teamId가 유효한 숫자인지 확인
        if (numericTeamId!==null) {
            // 스터디 페이지 페치 함수
            const fetchStudies = async () => {
                try {
                    setLoading(true);
                    const response = await axios.get(`/api/${numericTeamId}/study-pages`);
                    console.log(response); // 성공적인 응답 처리
                    setStudies(response.data);
                    console.log(studies[0]);
                } catch (err) {
                    console.error(err);
                    setError(true); // 오류 상태 업데이트
                } finally {
                    setLoading(false);
                }
            };
            fetchStudies(); // teamId가 존재할 때만 데이터 fetch
        } else {
            console.error("Invalid teamId:", teamId); // 유효하지 않은 teamId에 대한 로그 출력
            setStudies([]); // 유효하지 않은 teamId인 경우 상태 초기화
        }
    }, [numericTeamId, teamId]); // numericTeamId를 종속성 배열에 추가



    // 스터디 페이지를 제목으로 검색
    const filteredStudies = studies.filter(study =>
        (study.title?.toLowerCase().includes(searchQuery.toLowerCase())) || false
    );

    return (
        <div className="flex-1 p-4 bg-gray-900 text-white">
            {/* Search Box */}
            <div className="mb-6">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for studies..."
                    className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Display the list of studies in a card format */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : filteredStudies.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    {filteredStudies.map((study) => (
                        <li key={study.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <Link
                                to={{
                                    pathname: `/${teamId}/study-pages/${study.id}`,
                                    state: { study }}
                                }
                                className="block">
                                <img src={study.image?study.image: 'src/img/studypagedefaultimg.jpeg'} alt={study.title?study.title:notitle} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2"> {study.title?study.title:notitle} </h3>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            openLiveStreamWindow(study.id);
                                        }}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                                    >
                                        Join Live
                                    </button>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-400">No results found.</p>
            )}

            {/* Pagination Controls */}
            {filteredStudies.length > 0 && (
                <div className="flex justify-center space-x-2">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="flex items-center text-white">
                        Page {currentPage}
                    </span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudyPageRead;
