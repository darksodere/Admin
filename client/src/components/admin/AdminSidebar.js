import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard Overview',
      icon: '📊',
      description: 'View analytics and stats'
    },
    {
      id: 'upload',
      label: 'Upload Product',
      icon: '📦',
      description: 'Add new products'
    },
    {
      id: 'stock',
      label: 'Manage Stock',
      icon: '📋',
      description: 'Update inventory levels'
    },
    {
      id: 'banner',
      label: 'Change Home Banner',
      icon: '🖼️',
      description: 'Update homepage banner'
    },
    {
      id: 'popular',
      label: 'Manage Most Popular',
      icon: '⭐',
      description: 'Edit featured cards'
    }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo/Brand - Clickable to go home */}
      <div className="p-6 border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-300 transform hover:scale-105 group"
          title="Return to Home"
        >
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12">
            <span className="text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">OG</span>
          </div>
          <div className="text-left">
            <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">Otaku Ghor</h2>
            <p className="text-sm text-gray-500 group-hover:text-pink-500 transition-colors duration-300">
              <span className="group-hover:hidden">Admin Panel</span>
              <span className="hidden group-hover:inline animate-pulse">🏠 Click to go home!</span>
            </p>
          </div>
          {/* Anime sparkles animation */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex space-x-1">
              <span className="text-orange-400 animate-bounce text-sm">✨</span>
              <span className="text-pink-400 animate-pulse text-sm">🌸</span>
              <span className="text-orange-400 animate-bounce text-sm" style={{ animationDelay: '0.2s' }}>✨</span>
            </div>
          </div>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 group ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-sm ${
                      currentPage === item.id ? 'text-orange-100' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          <p>Admin Dashboard v1.0</p>
          <p className="text-xs mt-1">© 2024 Otaku Ghor</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;