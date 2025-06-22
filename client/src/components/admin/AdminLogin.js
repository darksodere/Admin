import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if already logged in
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      // Verify token with backend
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        // Token is valid, redirect to dashboard
        navigate('/admin');
      }
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate inputs
      if (!credentials.username || !credentials.password) {
        setError('Please enter both username and password');
        setLoading(false);
        return;
      }

      // Make login request
      const response = await axios.post('/api/admin/login', {
        username: credentials.username,
        password: credentials.password
      });

      if (response.data.accessToken) {
        // Store tokens and admin data
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        
        // Set default authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
        
        // Call onLogin callback if provided
        if (onLogin) {
          onLogin(response.data.admin);
        }
        
        // Redirect to admin dashboard
        navigate('/admin');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('Invalid username or password');
      } else if (error.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Login failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-purple-200">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">OG</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600">Access your OtakuGhor dashboard</p>
          <div className="flex justify-center space-x-2 mt-4 text-2xl">
            <span className="animate-bounce">🎌</span>
            <span className="animate-pulse">🔐</span>
            <span className="animate-bounce" style={{ animationDelay: '0.5s' }}>🎌</span>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-500 mr-2">⚠️</span>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}
        
        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <span className="mr-2">👤</span>
                Username
              </span>
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80"
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <span className="flex items-center">
                <span className="mr-2">🔒</span>
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80"
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>
        
        {/* Demo Info */}
        <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
          <h3 className="text-sm font-semibold text-purple-800 mb-2 flex items-center">
            <span className="mr-2">ℹ️</span>
            Demo Credentials
          </h3>
          <div className="text-sm text-purple-700 space-y-1">
            <p><strong>Username:</strong> otakumaster</p>
            <p><strong>Password:</strong> OtakuGhor2024!</p>
          </div>
          <p className="text-xs text-purple-600 mt-2">
            Use these credentials to access the admin panel
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 OtakuGhor. Secure admin access.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;