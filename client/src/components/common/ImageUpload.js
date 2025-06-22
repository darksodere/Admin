import React, { useState } from 'react';
import axios from '../../config/api';

const ImageUpload = ({ 
  onImageUpload, 
  currentImage = null, 
  placeholder = "Upload Image",
  className = "",
  maxSize = 5 * 1024 * 1024, // 5MB default
  acceptedFormats = "image/*"
}) => {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [error, setError] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      setError(`File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`);
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    setError(null);
    setUploading(true);

    try {
      // Create preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('/api/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setPreviewUrl(response.data.imageUrl);
        onImageUpload(response.data.imageUrl, response.data.publicId);
      } else {
        throw new Error(response.data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError(error.response?.data?.message || 'Upload failed. Please try again.');
      setPreviewUrl(currentImage); // Reset to original image
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    setError(null);
    onImageUpload(null, null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-all">
        {previewUrl ? (
          <div className="space-y-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-48 object-cover rounded-lg mx-auto"
            />
            <div className="flex justify-center space-x-3">
              <label className="cursor-pointer bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-all">
                {uploading ? 'Uploading...' : 'Change Image'}
                <input
                  type="file"
                  accept={acceptedFormats}
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                disabled={uploading}
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl text-gray-400">📷</div>
            <div>
              <p className="text-lg font-medium text-gray-700">{placeholder}</p>
              <p className="text-sm text-gray-500">
                PNG, JPG, WebP up to {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
            <label className="cursor-pointer bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all inline-block">
              {uploading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Uploading...</span>
                </div>
              ) : (
                'Choose File'
              )}
              <input
                type="file"
                accept={acceptedFormats}
                onChange={handleImageUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
          <span className="text-red-600">❌</span>
          <span className="text-red-700 text-sm">{error}</span>
        </div>
      )}

      {/* Upload Progress */}
      {uploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span className="text-blue-700 text-sm">Uploading to Cloudinary...</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;