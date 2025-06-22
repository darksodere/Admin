import React, { useState } from 'react';
import axios from '../../config/api';
import ImageUpload from '../common/ImageUpload';

const UploadProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    author: '',
    category: 'Manga',
    volume: '',
    printType: 'Yellow',
    price: '',
    available: true,
    image: '',
    stock: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const categories = [
    'Manga',
    'Light Novel',
    'Figures',
    'Accessories',
    'Clothing',
    'Gaming',
    'Art Books',
    'Collectibles'
  ];

  // Categories that require author field
  const authorRequiredCategories = ['Manga', 'Light Novel', 'Art Books'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (imageUrl, publicId) => {
    setFormData(prev => ({ ...prev, image: imageUrl || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Prepare product data for API
      const productData = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        volume: formData.volume ? parseInt(formData.volume) : undefined,
        printType: formData.printType,
        price: parseFloat(formData.price),
        available: formData.available,
        image: formData.image,
        stock: formData.stock
      };

      // Add author field if required for this category
      if (authorRequiredCategories.includes(formData.category) && formData.author) {
        productData.author = formData.author;
      }

      console.log('Submitting product:', productData);
      
      // Make API call
      const response = await axios.post('/api/products', productData);
      
      if (response.status === 201) {
        setSubmitStatus('success');
        alert('Product Uploaded!');
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          author: '',
          category: 'Manga',
          volume: '',
          printType: 'Yellow',
          price: '',
          available: true,
          image: '',
          stock: 0
        });
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      setSubmitStatus('error');
      alert('Error uploading product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Upload Product</h1>
          <p className="text-gray-600 mt-1">Add a new product to your store inventory</p>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-green-800 font-medium">Product uploaded successfully!</p>
            <p className="text-green-600 text-sm">Your product has been added to the inventory.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-red-600 text-xl">❌</span>
          <div>
            <p className="text-red-800 font-medium">Upload failed!</p>
            <p className="text-red-600 text-sm">Please check your information and try again.</p>
          </div>
        </div>
      )}

      {/* Upload Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Product Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3">
                Product Information
              </h2>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="e.g., Attack on Titan Volume 1"
                  required
                />
              </div>

              {/* Author Field - Show only for specific categories */}
              {authorRequiredCategories.includes(formData.category) && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., Hajime Isayama"
                    required={authorRequiredCategories.includes(formData.category)}
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Describe the product features, condition, and any special details..."
                />
              </div>

              {/* Category and Volume */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume Number
                  </label>
                  <input
                    type="number"
                    name="volume"
                    value={formData.volume}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="e.g., 1, 2, 3"
                    min="0"
                  />
                </div>
              </div>

              {/* Print Type and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.category === 'Manga' || formData.category === 'Light Novel') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Print Type *
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="printType"
                          value="Yellow"
                          checked={formData.printType === 'Yellow'}
                          onChange={handleInputChange}
                          className="mr-2 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm">Yellow Pages</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="printType"
                          value="White"
                          checked={formData.printType === 'White'}
                          onChange={handleInputChange}
                          className="mr-2 text-orange-500 focus:ring-orange-500"
                        />
                        <span className="text-sm">White Pages</span>
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (BDT) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="0"
                />
              </div>

              {/* Availability Toggle */}
              <div>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="available"
                    checked={formData.available}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Product is available for purchase
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-3">
                Product Image
              </h2>

              {/* Cloudinary Image Upload */}
              <ImageUpload
                onImageUpload={handleImageUpload}
                currentImage={formData.image}
                placeholder="Upload Product Image"
                maxSize={10 * 1024 * 1024} // 10MB for product images
              />

              {/* Image Guidelines */}
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-medium text-orange-800 mb-2">📋 Image Guidelines</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Use high-quality images (minimum 800x800px)</li>
                  <li>• Square aspect ratio works best</li>
                  <li>• Show the product clearly with good lighting</li>
                  <li>• Avoid watermarks or text overlays</li>
                  <li>• Images are automatically optimized by Cloudinary</li>
                </ul>
              </div>

              {/* Author Info for Manga/Light Novel */}
              {authorRequiredCategories.includes(formData.category) && (
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-medium text-purple-800 mb-2">✍️ Author Information</h3>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Enter the full name of the author/creator</li>
                    <li>• Use the original romanized name when possible</li>
                    <li>• For multiple authors, separate with commas</li>
                    <li>• This helps customers find works by their favorite creators</li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
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
                disabled={isSubmitting}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <span>📦</span>
                    <span>Upload Product</span>
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

export default UploadProduct;