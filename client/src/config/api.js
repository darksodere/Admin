import axios from 'axios';

// Set the base URL for all API requests
// Use environment variable for production, fallback to localhost for development
const baseURL = process.env.REACT_APP_API_URL || 
                process.env.NODE_ENV === 'production' 
                  ? window.location.origin 
                  : 'http://localhost:5002';

axios.defaults.baseURL = baseURL;

// Add request interceptor for debugging
axios.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
);

export default axios;