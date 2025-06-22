// Simple API test utility
import axios from '../config/api';

export const testApiConnection = async () => {
  try {
    console.log('Testing API connection...');
    console.log('Base URL:', axios.defaults.baseURL);
    
    const response = await axios.get('/api/health');
    console.log('API Health Check:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('API Connection Failed:', error);
    return { success: false, error: error.message };
  }
};

// Test the connection immediately when this module is imported
testApiConnection();