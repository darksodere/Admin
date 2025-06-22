import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [userType, setUserType] = useState(localStorage.getItem('userType')); // 'user' or 'admin'
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));

  // Set up axios interceptor for token
  useEffect(() => {
    if (accessToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [accessToken]);

  // Set up axios interceptor for automatic token refresh
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry && refreshToken) {
          originalRequest._retry = true;

          try {
            // Determine refresh endpoint based on user type
            const refreshEndpoint = userType === 'admin' ? '/api/admin/refresh' : '/api/auth/refresh';
            const response = await axios.post(refreshEndpoint, { 
              refreshToken: refreshToken 
            });
            
            if (response.data.accessToken) {
              const newAccessToken = response.data.accessToken;
              setAccessToken(newAccessToken);
              localStorage.setItem('accessToken', newAccessToken);
              axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
              
              // Update user data
              if (userType === 'admin' && response.data.admin) {
                setAdmin(response.data.admin);
              } else if (userType === 'user' && response.data.user) {
                setUser(response.data.user);
              }
              
              originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error('Token refresh failed:', refreshError);
            logout();
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken, userType]);

  // Verify token on app load
  useEffect(() => {
    verifyToken();
  }, []);

  const verifyToken = async () => {
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      // Try to verify as user first, then admin
      let response;
      try {
        response = await axios.get('/api/auth/verify');
        if (response.data.success && response.data.user) {
          setUser(response.data.user);
          setUserType('user');
          setAdmin(null);
          return;
        }
      } catch (userError) {
        // If user verification fails, try admin
        try {
          response = await axios.get('/api/admin/verify');
          if (response.data.success && response.data.admin) {
            setAdmin(response.data.admin);
            setUserType('admin');
            setUser(null);
            return;
          }
        } catch (adminError) {
          console.error('Token verification failed for both user and admin:', adminError);
          logout();
        }
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Admin login
  const adminLogin = async (username, password) => {
    try {
      const response = await axios.post('/api/admin/login', {
        username,
        password
      });

      if (response.data.accessToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, admin: adminData } = response.data;
        
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setAdmin(adminData);
        setUser(null);
        setUserType('admin');
        
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('userType', 'admin');
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        return { success: true, admin: adminData };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      const message = error.response?.data?.message || 'Admin login failed';
      return { success: false, message };
    }
  };

  // User login
  const userLogin = async (emailOrUsername, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        emailOrUsername,
        password
      });

      if (response.data.accessToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user: userData } = response.data;
        
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser(userData);
        setAdmin(null);
        setUserType('user');
        
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('userType', 'user');
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        return { success: true, user: userData };
      }
    } catch (error) {
      console.error('User login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      return { success: false, message };
    }
  };

  // User registration
  const userRegister = async (userData) => {
    try {
      const response = await axios.post('/api/auth/register', userData);

      if (response.data.accessToken) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken, user: newUser } = response.data;
        
        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setUser(newUser);
        setAdmin(null);
        setUserType('user');
        
        localStorage.setItem('accessToken', newAccessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        localStorage.setItem('userType', 'user');
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        return { success: true, user: newUser, message: response.data.message };
      }
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || 'Registration failed';
      return { success: false, message };
    }
  };

  // Generic login function (backward compatibility)
  const login = async (usernameOrEmail, password, isAdmin = false) => {
    if (isAdmin) {
      return adminLogin(usernameOrEmail, password);
    } else {
      return userLogin(usernameOrEmail, password);
    }
  };

  const logout = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setAdmin(null);
    setUser(null);
    setUserType(null);
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userType');
    
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = () => {
    return !!accessToken && (!!admin || !!user);
  };

  const isAdmin = () => {
    return userType === 'admin' && !!admin;
  };

  const isUser = () => {
    return userType === 'user' && !!user;
  };

  const hasRole = (role) => {
    if (userType === 'admin') {
      return admin?.role === role;
    } else if (userType === 'user') {
      return user?.role === role;
    }
    return false;
  };

  const getCurrentUser = () => {
    return userType === 'admin' ? admin : user;
  };

  const value = {
    // User data
    user,
    admin,
    userType,
    
    // Token data
    accessToken,
    refreshToken,
    loading,
    
    // Authentication methods
    login,
    adminLogin,
    userLogin,
    userRegister,
    logout,
    
    // Utility methods
    isAuthenticated,
    isAdmin,
    isUser,
    hasRole,
    getCurrentUser,
    verifyToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};