import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with the base URL of your API
 
});

// Define interceptors for requests and responses if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify request configurations before sending if needed
    // For example, add an authentication token
    return config;
  },
  (error) => {
    // Handle request errors if needed
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Process responses before returning if needed
    return response;
  },
  (error) => {
    // Handle response errors if needed
    return Promise.reject(error);
  }
);

export default axiosInstance;