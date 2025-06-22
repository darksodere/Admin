import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import ImageUpload from '../common/ImageUpload';

const ChangeHomeBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(null);
  const [bannerImageUrl, setBannerImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [bannerSettings, setBannerSettings] = useState({
    title: 'Welcome to Otaku Ghor',
    subtitle: 'Your Ultimate Anime & Manga Destination',
    buttonText: 'Shop Now',
    buttonLink: '/products',
    overlayOpacity: 0.4
  });

  useEffect(() => {
    fetchCurrentBanner();
  }, []);

  const fetchCurrentBanner = async () => {
    try {
      const response = await axios.get('/api/banner/current');
      if (response.data) {
        setCurrentBanner(response.data.image);
        setBannerSettings({
          title: response.data.title || 'Welcome to Otaku Ghor',
          subtitle: response.data.subtitle || 'Your Ultimate Anime & Manga Destination',
          buttonText: response.data.buttonText || 'Shop Now',
          buttonLink: response.data.buttonLink || '/products',
          overlayOpacity: response.data.overlayOpacity || 0.4
        });
      }
    } catch (error) {
      console.error('Error fetching current banner:', error);
    }
  };

  const handleImageUpload = (imageUrl, publicId) => {
    setBannerImageUrl(imageUrl);
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setBannerSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImageUrl) {
      alert('Please upload a banner image');
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const bannerData = {
        image: bannerImageUrl,
        ...bannerSettings
      };

      console.log('Submitting banner:', bannerData);
      
      const response = await axios.post('/api/banner', bannerData);
      
      if (response.status === 200) {
        setUploadStatus('success');
        alert('Banner Updated!');
        setCurrentBanner(bannerImageUrl);
        setBannerImageUrl(null);
      }
    } catch (error) {
      console.error('Error uploading banner:', error);
      setUploadStatus('error');
      alert('Error updating banner. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Change Home Banner</h1>
          <p className="text-gray-600 mt-1">Update your homepage banner image and settings</p>
        </div>
      </div>

      {/* Status Messages */}
      {uploadStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-green-800 font-medium">Banner updated successfully!</p>
            <p className="text-green-600 text-sm">Your new homepage banner is now live.</p>
          </div>
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-red-600 text-xl">❌</span>
          <div>
            <p className="text-red-800 font-medium">Upload failed!</p>
            <p className="text-red-600 text-sm">Please check your image and try again.</p>
          </div>
        </div>
      )}

      {/* Current Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Current Banner</h2>
          <p className="text-gray-600 text-sm">This is your current homepage banner</p>
        </div>
        <div className="relative">
          {currentBanner ? (
            <>
              <img
                src={currentBanner}
                alt="Current banner"
                className="w-full h-64 object-cover"
              />
              <div 
                className="absolute inset-0 bg-black flex items-center justify-center"
                style={{ opacity: bannerSettings.overlayOpacity }}
              >
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-2">{bannerSettings.title}</h1>
                  <p className="text-xl mb-4">{bannerSettings.subtitle}</p>
                  <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium">
                    {bannerSettings.buttonText}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-64 bg-gray-100 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-6xl mb-4">🖼️</div>
                <h3 className="text-lg font-medium mb-2">No Banner Set</h3>
                <p className="text-sm">Upload a banner image to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upload New Banner */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Upload New Banner</h2>
          <p className="text-gray-600 text-sm">Select a new image and configure banner settings</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Upload */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Banner Image</h3>
              
              {/* Cloudinary Image Upload */}
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={bannerImageUrl}
                placeholder="Upload Banner Image"
                maxSize={5 * 1024 * 1024} // 5MB for banners
              />

              {/* Image Guidelines */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">📋 Banner Guidelines</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Recommended size: 1200x400 pixels</li>
                  <li>• Aspect ratio: 3:1 (landscape)</li>
                  <li>• File formats: PNG, JPG, WebP</li>
                  <li>• Maximum file size: 5MB</li>
                  <li>• Images are automatically optimized</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Banner Settings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Banner Settings</h3>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={bannerSettings.title}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter banner title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={bannerSettings.subtitle}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter banner subtitle"
                />
              </div>

              {/* Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  name="buttonText"
                  value={bannerSettings.buttonText}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter button text"
                />
              </div>

              {/* Button Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={bannerSettings.buttonLink}
                  onChange={handleSettingsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Enter button link (e.g., /products)"
                />
              </div>

              {/* Overlay Opacity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overlay Opacity: {Math.round(bannerSettings.overlayOpacity * 100)}%
                </label>
                <input
                  type="range"
                  name="overlayOpacity"
                  min="0"
                  max="0.8"
                  step="0.1"
                  value={bannerSettings.overlayOpacity}
                  onChange={handleSettingsChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Transparent</span>
                  <span>Dark</span>
                </div>
              </div>

              {/* Live Preview */}
              {bannerImageUrl && (
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700">
                    Live Preview
                  </div>
                  <div className="relative">
                    <img
                      src={bannerImageUrl}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                    />
                    <div 
                      className="absolute inset-0 bg-black flex items-center justify-center"
                      style={{ opacity: bannerSettings.overlayOpacity }}
                    >
                      <div className="text-center text-white">
                        <h4 className="text-lg font-bold mb-1">{bannerSettings.title}</h4>
                        <p className="text-sm mb-2">{bannerSettings.subtitle}</p>
                        <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded text-xs">
                          {bannerSettings.buttonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !bannerImageUrl}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <span>🖼️</span>
                    <span>Update Banner</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeHomeBanner;