import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { userLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const result = await userLogin(formData.emailOrUsername, formData.password);
      
      if (result.success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      } else {
        setErrors({ submit: result.message });
      }
    } catch (error) {
      setErrors({ submit: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Floating Anime Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-4xl opacity-60 animate-bounce" style={{animationDelay: '0s'}}>🌸</div>
        <div className="absolute top-40 right-20 text-3xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
        <div className="absolute bottom-32 left-20 text-5xl opacity-40 animate-bounce" style={{animationDelay: '2s'}}>✨</div>
        <div className="absolute bottom-20 right-10 text-4xl opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}>💫</div>
        <div className="absolute top-60 left-1/2 text-3xl opacity-50 animate-bounce" style={{animationDelay: '1.5s'}}>🌟</div>
      </div>
      
      <div className="auth-card">
        <div className="auth-header">
          <h1>おかえり！ Welcome Back!</h1>
          <p>Sign in to continue your anime adventure! (◕‿◕)♡</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="emailOrUsername">Email or Username</label>
            <input
              type="text"
              id="emailOrUsername"
              name="emailOrUsername"
              value={formData.emailOrUsername}
              onChange={handleChange}
              className={errors.emailOrUsername ? 'error' : ''}
              placeholder="Enter your email or username ✨"
              disabled={loading}
            />
            {errors.emailOrUsername && (
              <span className="field-error">{errors.emailOrUsername}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
                placeholder="Enter your secret password (｡◕‿◕｡)"
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👀' : '🙈'}
              </button>
            </div>
            {errors.password && (
              <span className="field-error">{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? '✨ Signing In... ✨' : '🚀 Let\'s Go! Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            New to our anime world? (◕‿◕){' '}
            <Link to="/signup" className="auth-link">
              🌟 Join the Adventure!
            </Link>
          </p>
          <p>
            <Link to="/forgot-password" className="auth-link">
              😅 Forgot Password?
            </Link>
          </p>
        </div>

        <div className="auth-divider">
          <span>または (or)</span>
        </div>

        <div className="admin-login-link">
          <Link to="/admin/login" className="admin-link">
            👑 Admin Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;