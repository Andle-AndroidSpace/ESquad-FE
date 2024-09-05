import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link } from 'react-router-dom';
import LiveStreamWindow from '../stream/LiveStreamWindow';

// Generate dummy study data
const generateDummyStudies = () => {
   const studyTitles = Array.from({ length: 50 }, (_, index) => `Study Topic ${index + 1} A`);
   const owners = ['Dr. A', 'Dr. B', 'Dr. C', 'Dr. D'];
   const openDates = ['2021-01-01', '2021-06-15', '2021-12-01', '2022-08-23', '2023-03-17'];

   return studyTitles.map((title, index) => ({
      id: index + 1,
      title: title,
      author: owners[index % owners.length],
      publishedDate: openDates[index % openDates.length],
      image: `https://via.placeholder.com/150?text=Study+${index + 1}`,
   }));
}; 

function openLiveStreamWindow(studyId) {
    const liveStreamWindow = window.open("", "Live Stream", "width=800,height=600");

    // Create a root element for React to render into
    const rootElement = liveStreamWindow.document.createElement('div');
    liveStreamWindow.document.body.appendChild(rootElement);

    // Use createRoot for rendering
    const root = createRoot(rootElement);
    root.render(<LiveStreamWindow studyId={studyId} />);

    // Apply Tailwind CSS or any other necessary styles
    const styleTag = liveStreamWindow.document.createElement('style');
    styleTag.innerHTML = `
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
    `;
    liveStreamWindow.document.head.appendChild(styleTag);

    // Center the window on the screen
    liveStreamWindow.moveTo(
        window.screen.width / 2 - 400,
        window.screen.height / 2 - 300
    );
}

const Study = () => {
   // Generate dummy studies
   const dummyStudies = generateDummyStudies();

   const [searchQuery, setSearchQuery] = useState('');
   const [currentPage, setCurrentPage] = useState(1);

   // Filtered studies based on search query
   const filteredStudies = dummyStudies.filter(study =>
      study.title.toLowerCase().includes(searchQuery.toLowerCase())
   );
   
   const itemsPerPage = 12;
   const totalPages = Math.ceil(filteredStudies.length / itemsPerPage);

   // Get current page items
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentItems = filteredStudies.slice(startIndex, startIndex + itemsPerPage);

   // Handle page change
   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   return (
        <div className="flex-1 p-4 bg-gray-900 text-white">
            {/* Search Box */}
            <div className="mb-6"> {/* Increased margin-bottom for more gap */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for studies..."
                    className="w-full p-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Display the list of studies in a card format */}
            {filteredStudies.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
                    {currentItems.map((study) => (
                        <li key={study.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                            <Link to={`/pages/studypages/${study.id}`} study={study} className="block">
                                <img src={study.image} alt={study.title} className="w-full h-32 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">{study.title}</h3>
                                    <p className="text-sm text-gray-400">by {study.author}</p>
                                    <p className="text-sm text-gray-500">Opened: {study.publishedDate}</p>
                                    {/* New Button Added */}
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevents Link click when button is clicked
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
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="flex items-center text-white">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
  );
};


export default Study;