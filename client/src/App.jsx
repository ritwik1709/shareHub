import { useState } from 'react'
import './App.css'
import backgroundImage from './assets/background.jpg'
import { uploadFile } from './service/api'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadStatus('');
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first!');
      return;
    }

    try {
      setUploadStatus('Uploading...');
      
      // Create FormData
      const formData = new FormData();
      formData.append('file', selectedFile);

      // Upload file
      const response = await uploadFile(formData);
      
      setUploadStatus('File uploaded successfully!');
      setSelectedFile(null);
      // Reset the file input
      document.getElementById('file-input').value = '';
      
      console.log('Upload response:', response);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="app-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="content-wrapper">
        <h1 className="title">ShareHub- The File Sharing App!</h1>
        <button 
          className="upload-btn"
          onClick={handleUpload}
        >
          Upload File
        </button>
        <div className="file-input-container">
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-input-label">
            {selectedFile ? selectedFile.name : 'Choose a file...'}
          </label>
        </div>
        {uploadStatus && (
          <div className={`upload-status ${uploadStatus.includes('Error') ? 'error' : 'success'}`}>
            {uploadStatus}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
