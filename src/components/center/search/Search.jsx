import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const generateDummyBooks = () => {
   const bookTitles = Array.from({ length: 150 }, (_, index) => `Book Title ${index + 1} 아`);
   const authors = ['Author A', 'Author B', 'Author C', 'Author D'];
   const publishedDates = ['2000-01-01', '2005-06-15', '2010-12-01', '2015-08-23', '2020-03-17'];

   return bookTitles.map((title, index) => ({
       id: index + 1,
       title: title,
       author: authors[index % authors.length],
       publishedDate: publishedDates[index % publishedDates.length],
       image: `https://via.placeholder.com/150?text=Book+${index + 1}`
   }));
};

const Search = () => {
   const location = useLocation();
   const query = new URLSearchParams(location.search).get('query') || '';

   // Generate dummy books
   const dummyBooks = generateDummyBooks();

   // Filter books based on the query
   const searchResults = dummyBooks.filter(book =>
       book.title.toLowerCase().includes(query.toLowerCase())
   );

   // Pagination state
   const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 12;
   const totalPages = Math.ceil(searchResults.length / itemsPerPage);

   // Get current page items
   const startIndex = (currentPage - 1) * itemsPerPage;
   const currentItems = searchResults.slice(startIndex, startIndex + itemsPerPage);

   // Handle page change
   const handlePageChange = (pageNumber) => {
       setCurrentPage(pageNumber);
   };

   return (
      <div className="flex-1 p-4 bg-gray-900 text-white">
          {/* Conditionally render message if there are no search results */}
          {searchResults.length === 0 && (
              <h2 className="text-2xl font-bold mb-4">"{query}"에 대한 도서 정보가 없습니다..</h2>
          )}
          {searchResults.length > 0 ? (
              <>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                      {currentItems.map((book) => (
                          <li key={book.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                              <Link to={`/books/${book.id}`} className="block">
                                  <img src={book.image} alt={book.title} className="w-full h-32 object-cover" />
                                  <div className="p-4">
                                      <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                                      <p className="text-sm text-gray-400">by {book.author}</p>
                                  </div>
                              </Link>
                          </li>
                      ))}
                  </ul>

                  {/* Pagination Controls */}
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
              </>
          ) : null}
      </div>
  );
};

export default Search;