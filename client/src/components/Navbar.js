import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems = [] } = useCart();
  const { isAuthenticated, isUser, isAdmin, getCurrentUser, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate floating sparkles
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 3,
        size: Math.random() * 8 + 4,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 8000);
    return () => clearInterval(interval);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  return (
    <>
      {/* Floating Sparkles Background */}
      <div className="fixed top-0 left-0 w-full h-20 pointer-events-none z-40 overflow-hidden">
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute animate-float opacity-60"
            style={{
              left: `${sparkle.left}%`,
              top: '10px',
              animationDelay: `${sparkle.animationDelay}s`,
              fontSize: `${sparkle.size}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-2xl border-b border-anime-purple-200/50' 
          : 'bg-gradient-to-r from-white/90 via-anime-purple-50/80 to-anime-pink-50/80 backdrop-blur-md shadow-lg border-b border-anime-purple-100/30'
      }`}>
        {/* Animated gradient border */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 opacity-60 animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                {/* Animated Logo */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 rounded-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl animate-glow">
                    <span className="text-white font-bold text-lg font-kosugi">OG</span>
                  </div>
                  {/* Floating particles around logo */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-anime-pink-400 rounded-full animate-ping opacity-75 group-hover:opacity-100"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-anime-blue-400 rounded-full animate-pulse opacity-75 group-hover:opacity-100"></div>
                </div>
                
                {/* Brand Name */}
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-gradient font-kosugi group-hover:scale-105 transition-transform duration-300">
                    Otaku Ghor
                  </span>
                  <span className="text-xs text-anime-purple-400 font-medium -mt-1 opacity-80">
                    アニメの世界 ✨
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {[
                { path: '/', label: 'Home', icon: '🏠' },
                { path: '/shop', label: 'Shop', icon: '🛍️' },
                { path: '/manga-list', label: 'Manga', icon: '📚' },
                { path: '/community', label: 'Community', icon: '👥' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 group ${
                    isActive(item.path) 
                      ? 'text-white bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 shadow-lg' 
                      : 'text-gray-700 hover:text-anime-purple-600 hover:bg-white/60 hover:shadow-md'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-base group-hover:animate-bounce">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                  
                  {/* Hover effect */}
                  {!isActive(item.path) && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-anime-purple-500/10 to-anime-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
              
              {/* Cart Button */}
              <Link 
                to="/cart" 
                className="relative ml-4 btn-anime btn-primary shadow-lg hover:shadow-2xl transform hover:scale-105 group"
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg group-hover:animate-bounce">🛒</span>
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-anime-pink-400 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                      {cartItemCount}
                    </span>
                  )}
                </span>
                
                {/* Cart glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-anime-purple-400 to-anime-pink-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </Link>

              {/* Authentication Section */}
              {isAuthenticated() ? (
                <div className="relative ml-4 user-menu-container">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {currentUser?.firstName?.[0] || currentUser?.username?.[0] || '👤'}
                      </span>
                    </div>
                    <span className="font-medium">
                      {isAdmin() ? `Admin: ${currentUser?.username}` : currentUser?.firstName || currentUser?.username}
                    </span>
                    <span className={`transform transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-anime-purple-100 py-2 z-50 animate-slideDown">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {currentUser?.fullName || `${currentUser?.firstName} ${currentUser?.lastName}` || currentUser?.username}
                        </p>
                        <p className="text-xs text-gray-500">
                          {currentUser?.email || (isAdmin() ? 'Administrator' : 'User')}
                        </p>
                        {isAdmin() && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-anime-purple-100 text-anime-purple-700 rounded-full">
                            Admin
                          </span>
                        )}
                      </div>
                      
                      <div className="py-1">
                        {isUser() && (
                          <>
                            <Link
                              to="/profile"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-anime-purple-50 hover:text-anime-purple-600 transition-colors duration-200"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <span className="mr-3">👤</span>
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-anime-purple-50 hover:text-anime-purple-600 transition-colors duration-200"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <span className="mr-3">📦</span>
                              My Orders
                            </Link>
                          </>
                        )}
                        
                        {isAdmin() && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-anime-purple-50 hover:text-anime-purple-600 transition-colors duration-200"
                            onClick={() => setShowUserMenu(false)}
                          >
                            <span className="mr-3">⚙️</span>
                            Admin Dashboard
                          </Link>
                        )}
                        
                        <div className="border-t border-gray-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                          >
                            <span className="mr-3">🚪</span>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 ml-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-anime-purple-600 hover:text-anime-purple-700 hover:bg-white/60 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2 text-gray-700 hover:text-anime-purple-600 focus:outline-none focus:text-anime-purple-600 rounded-lg hover:bg-white/60 transition-all duration-300 group"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 top-3' : 'top-1'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 top-3' : 'top-5'
                  }`}></span>
                </div>
                
                {/* Mobile button glow */}
                <div className="absolute inset-0 rounded-lg bg-anime-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-2 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-sm rounded-2xl mt-2 shadow-2xl border border-anime-purple-100">
              {[
                { path: '/', label: 'Home', icon: '🏠' },
                { path: '/shop', label: 'Shop', icon: '🛍️' },
                { path: '/manga-list', label: 'Manga', icon: '📚' },
                { path: '/community', label: 'Community', icon: '👥' }
              ].map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActive(item.path) 
                      ? 'text-white bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 shadow-lg' 
                      : 'text-gray-700 hover:text-anime-purple-600 hover:bg-anime-purple-50'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                </Link>
              ))}
              
              {/* Mobile Cart */}
              <Link 
                to="/cart" 
                className="block w-full text-center btn-anime btn-primary mt-4 shadow-lg transform hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center justify-center space-x-2">
                  <span className="text-lg">🛒</span>
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="bg-anime-pink-400 text-white text-xs rounded-full px-2 py-1">
                      {cartItemCount}
                    </span>
                  )}
                </span>
              </Link>

              {/* Mobile Authentication */}
              {isAuthenticated() ? (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="px-4 py-3 bg-gradient-to-r from-anime-purple-50 to-anime-pink-50 rounded-xl mb-3">
                    <p className="text-sm font-medium text-gray-900">
                      {currentUser?.fullName || `${currentUser?.firstName} ${currentUser?.lastName}` || currentUser?.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {currentUser?.email || (isAdmin() ? 'Administrator' : 'User')}
                    </p>
                    {isAdmin() && (
                      <span className="inline-block mt-1 px-2 py-1 text-xs bg-anime-purple-100 text-anime-purple-700 rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  
                  {isUser() && (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-anime-purple-50 rounded-xl transition-colors duration-200 mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-3 text-lg">👤</span>
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-anime-purple-50 rounded-xl transition-colors duration-200 mb-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="mr-3 text-lg">📦</span>
                        My Orders
                      </Link>
                    </>
                  )}
                  
                  {isAdmin() && (
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-anime-purple-50 rounded-xl transition-colors duration-200 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="mr-3 text-lg">⚙️</span>
                      Admin Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 mt-2"
                  >
                    <span className="mr-3 text-lg">🚪</span>
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-anime-purple-600 hover:text-anime-purple-700 hover:bg-anime-purple-50 rounded-xl transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;