import axios from 'axios';

const API_URL = '/api';

export const uploadFile = async (formData) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log('Upload Progress:', percentCompleted + '%');
      }
    };

    // Log the formData contents for debugging
    for (let pair of formData.entries()) {
      console.log('FormData content:', pair[0], pair[1]);
    }

    const response = await axios.post(`${API_URL}/upload`, formData, config);
    console.log('Upload response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error.response?.data || error.message);
    throw error;
  }
};

// Add other API calls as needed