import React, { useState } from 'react';
import NotificationDropdown from './NotificationDropdown';

const AdminTopbar = ({ adminData, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Handle different admin data structures
  const adminName = adminData?.name || adminData?.username || 'Admin';
  const adminEmail = adminData?.email || 'admin@otakughor.com';
  const adminRole = adminData?.role || 'Administrator';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Welcome Message */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {adminName}! 👋
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {currentDate} • {currentTime}
          </p>
        </div>

        {/* Right Side - Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Dynamic Notifications */}
          <NotificationDropdown />

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 px-4 py-2 bg-orange-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm font-bold text-orange-600">0</div>
              <div className="text-xs text-gray-600">Products</div>
            </div>
            <div className="w-px h-8 bg-orange-200"></div>
            <div className="text-center">
              <div className="text-sm font-bold text-pink-600">0</div>
              <div className="text-xs text-gray-600">Orders</div>
            </div>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              {adminData?.avatar ? (
                <img
                  src={adminData.avatar}
                  alt={adminName}
                  className="w-10 h-10 rounded-full border-2 border-orange-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full border-2 border-orange-200 bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {adminName ? adminName.charAt(0).toUpperCase() : 'A'}
                </div>
              )}
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-gray-800">{adminName}</div>
                <div className="text-xs text-gray-500 capitalize">{adminRole}</div>
              </div>
              <svg 
                className={`w-4 h-4 text-gray-600 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="text-sm font-medium text-gray-800">{adminName}</div>
                  <div className="text-xs text-gray-500">{adminEmail}</div>
                </div>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <span>👤</span>
                  <span>Profile Settings</span>
                </button>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <span>⚙️</span>
                  <span>Preferences</span>
                </button>
                
                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                  <span>📊</span>
                  <span>Analytics</span>
                </button>
                
                <div className="border-t border-gray-100 mt-2 pt-2">
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;