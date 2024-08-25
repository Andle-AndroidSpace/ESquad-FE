import React, { useState } from 'react';

const StudyPage = ({ title, author, publishedDate, description, image }) => {
    // Dummy data representing previously saved files
    const initialFiles = [
        {
            id: 'file1',
            name: 'StudyNotes.pdf',
            url: 'https://example.com/StudyNotes.pdf',
        },
        {
            id: 'file2',
            name: 'ResearchPaper.docx',
            url: 'https://example.com/ResearchPaper.docx',
        },
        {
            id: 'file3',
            name: 'Presentation.pptx',
            url: 'https://example.com/Presentation.pptx',
        },
    ];

    // State to hold the list of uploaded files, starting with the dummy data
    const [uploadedFiles, setUploadedFiles] = useState(initialFiles);

    // Handle file upload
    const handleFileUpload = (event) => {
        const files = event.target.files;
        const newFiles = Array.from(files).map(file => ({
            id: file.name + Date.now(), // Generate a unique ID for each file
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        // Add the new files to the existing list
        setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    };

    // Handle file download
    const handleFileDownload = (fileUrl, fileName) => {
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="p-4 bg-gray-900 text-white min-h-screen flex justify-center">
            <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg ">
                <img src={image} alt={title} className="w-full h-72 object-cover" />
                <div className="p-6">
                    <h2 className="text-3xl font-bold mb-2">{title}</h2>
                    <p className="text-sm text-gray-400 mb-2">by {author}</p>
                    <p className="text-sm text-gray-500 mb-4">Published: {publishedDate}</p>
                    <p className="text-base text-gray-200 mb-6 leading-relaxed">{description}</p>
                </div>
    
                {/* File Upload and Display Section */}
                <div className="p-6 bg-gradient-to-r from-gray-700 to-gray-600">
                    <h3 className="text-xl font-semibold mb-4">저장</h3>
    
                    {/* Uploaded Files List */}
                    <ul className="space-y-2 mb-4">
                        {uploadedFiles.map((file) => (
                            <li
                                key={file.id}
                                className="flex items-center justify-between p-3 bg-gray-800 rounded-md shadow-sm"
                            >
                                <span className="text-sm">{file.name}</span>
                                <button
                                    onClick={() => handleFileDownload(file.url, file.name)}
                                    className="text-blue-400 hover:underline text-sm"
                                >
                                    다운로드
                                </button>
                            </li>
                        ))}
                    </ul>
    
                    {/* File Upload Input */}
                    <input
                        type="file"
                        onChange={handleFileUpload}
                        multiple
                        className="block w-full text-sm text-gray-400 bg-gray-900 border border-gray-600 rounded-lg cursor-pointer focus:outline-none mb-4 p-2"
                    />
    
                    {/* Save Button */}
                    <button
                        onClick={handleFileUpload}
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-300 shadow-lg"
                    >
                        등록
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudyPage;