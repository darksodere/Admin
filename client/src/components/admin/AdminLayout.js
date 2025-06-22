import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Anime-themed Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b-4 border-gradient-to-r from-purple-500 via-pink-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Navigation */}
            <div className="flex items-center space-x-4">
              {/* Return Home Button */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">🏠</span>
                <span className="font-medium">Home</span>
              </button>

              {/* Admin Dashboard Button */}
              <button
                onClick={() => navigate('/admin')}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-lg">📊</span>
                <span className="font-medium">Dashboard</span>
              </button>
            </div>

            {/* Center - Title */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                ✨ OtakuGhor Admin ✨
              </h1>
            </div>

            {/* Right side - Quick Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => navigate('/admin/upload-product')}
                className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-all"
                title="Upload Product"
              >
                <span className="text-xl">➕</span>
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="p-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-lg transition-all"
                title="Orders"
              >
                <span className="text-xl">📋</span>
              </button>
              <button
                onClick={() => navigate('/admin/analytics')}
                className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-100 rounded-lg transition-all"
                title="Analytics"
              >
                <span className="text-xl">📊</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="inline-block p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 text-lg">{subtitle}</p>
            )}
            {/* Anime decorations */}
            <div className="flex justify-center space-x-2 mt-4">
              <span className="text-2xl animate-bounce">🌸</span>
              <span className="text-2xl animate-pulse">⭐</span>
              <span className="text-2xl animate-bounce" style={{ animationDelay: '0.5s' }}>🌸</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6">
          {children}
        </div>
      </main>

      {/* Anime-themed Footer */}
      <footer className="mt-12 text-center py-6">
        <div className="flex justify-center space-x-4 text-3xl mb-4">
          <span className="animate-bounce">🎌</span>
          <span className="animate-pulse">🗾</span>
          <span className="animate-bounce" style={{ animationDelay: '0.3s' }}>🎋</span>
          <span className="animate-pulse" style={{ animationDelay: '0.6s' }}>🌸</span>
          <span className="animate-bounce" style={{ animationDelay: '0.9s' }}>⛩️</span>
        </div>
        <p className="text-gray-600">
          Made with <span className="text-red-500 animate-pulse">❤️</span> for the Otaku Community
        </p>
      </footer>
    </div>
  );
};

export default AdminLayout;