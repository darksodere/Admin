import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AuthPages.css';

const ProfilePage = () => {
  const { user, isUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated or not a user
  useEffect(() => {
    if (!isAuthenticated() || !isUser()) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isUser, navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-anime-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50 to-anime-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">✨ My Anime Profile ✨</h1>
          <p className="text-gray-600">Manage your otaku adventure settings! (◕‿◕)♡</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card-anime p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-white">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                {user.fullName || `${user.firstName} ${user.lastName}`}
              </h2>
              <p className="text-gray-600 mb-2">@{user.username}</p>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-anime-purple-100 text-anime-purple-700 rounded-full text-sm font-medium">
                  {user.role === 'premium' ? '⭐ Premium Otaku' : '🌸 Anime Fan'}
                </span>
              </div>
              
              <p className="text-xs text-gray-500">
                🎌 Otaku since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="card-anime p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">📋 Account Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 First Name
                  </label>
                  <div className="p-3 bg-gradient-to-r from-anime-purple-50 to-anime-pink-50 rounded-lg border border-anime-purple-200">
                    {user.firstName}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👤 Last Name
                  </label>
                  <div className="p-3 bg-gradient-to-r from-anime-purple-50 to-anime-pink-50 rounded-lg border border-anime-purple-200">
                    {user.lastName}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🎭 Username
                  </label>
                  <div className="p-3 bg-gradient-to-r from-anime-purple-50 to-anime-pink-50 rounded-lg border border-anime-purple-200">
                    @{user.username}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ✉️ Email Address
                  </label>
                  <div className="p-3 bg-gradient-to-r from-anime-purple-50 to-anime-pink-50 rounded-lg border border-anime-purple-200">
                    {user.email}
                  </div>
                </div>
                
                {user.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {user.phone}
                    </div>
                  </div>
                )}
                
                {user.dateOfBirth && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <div className="p-3 bg-gray-50 rounded-lg border">
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>

              {/* Address Information */}
              {user.address && Object.keys(user.address).length > 0 && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {user.address.street && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Street Address
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {user.address.street}
                        </div>
                      </div>
                    )}
                    
                    {user.address.city && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {user.address.city}
                        </div>
                      </div>
                    )}
                    
                    {user.address.state && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {user.address.state}
                        </div>
                      </div>
                    )}
                    
                    {user.address.zipCode && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <div className="p-3 bg-gray-50 rounded-lg border">
                          {user.address.zipCode}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Preferences */}
              {user.preferences && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h4>
                  
                  {user.preferences.favoriteGenres && user.preferences.favoriteGenres.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Favorite Genres
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {user.preferences.favoriteGenres.map((genre, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-anime-purple-100 text-anime-purple-700 rounded-full text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Notifications
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {user.preferences.notifications?.email ? '✅ Enabled' : '❌ Disabled'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Push Notifications
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {user.preferences.notifications?.push ? '✅ Enabled' : '❌ Disabled'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/edit-profile')}
                  className="btn-anime btn-primary flex-1"
                  disabled={loading}
                >
                  ✏️ Edit Profile
                </button>
                <button
                  onClick={() => navigate('/change-password')}
                  className="btn-anime btn-secondary flex-1"
                  disabled={loading}
                >
                  🔐 Change Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-anime p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-3xl font-bold text-anime-purple-600 mb-2">0</div>
            <div className="text-gray-600">Orders Placed</div>
          </div>
          
          <div className="card-anime p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-2">💖</div>
            <div className="text-3xl font-bold text-anime-pink-600 mb-2">0</div>
            <div className="text-gray-600">Wishlist Items</div>
          </div>
          
          <div className="card-anime p-6 text-center hover:scale-105 transition-transform duration-300">
            <div className="text-4xl mb-2">🕐</div>
            <div className="text-lg font-bold text-anime-blue-600 mb-2">
              {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Today'}
            </div>
            <div className="text-gray-600">Last Adventure</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;