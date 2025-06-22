import React, { useState, useEffect } from 'react';
import axios from '../../config/api';
import ImageUpload from '../common/ImageUpload';

const ManageMostPopular = () => {
  const [featuredCards, setFeaturedCards] = useState([
    {
      id: 1,
      slot: 1,
      title: '',
      description: '',
      image: null,
      isActive: false
    },
    {
      id: 2,
      slot: 2,
      title: '',
      description: '',
      image: null,
      isActive: false
    },
    {
      id: 3,
      slot: 3,
      title: '',
      description: '',
      image: null,
      isActive: false
    }
  ]);

  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetchFeaturedCards();
  }, []);

  const fetchFeaturedCards = async () => {
    try {
      const response = await axios.get('/api/featured-cards');
      if (response.data && response.data.length > 0) {
        const cards = [1, 2, 3].map(slot => {
          const existingCard = response.data.find(card => card.slot === slot);
          return existingCard || {
            id: slot,
            slot: slot,
            title: '',
            description: '',
            image: null,
            isActive: false
          };
        });
        setFeaturedCards(cards);
      }
    } catch (error) {
      console.error('Error fetching featured cards:', error);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      title: card.title,
      description: card.description,
      image: card.image || ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (imageUrl, publicId) => {
    setFormData(prev => ({ ...prev, image: imageUrl || '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingCard) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const cardData = {
        slot: editingCard.slot,
        title: formData.title,
        description: formData.description,
        image: formData.image,
        isActive: true
      };

      console.log('Submitting featured card:', cardData);
      
      const response = await axios.post('/api/featured-cards', cardData);
      
      if (response.status === 200 || response.status === 201) {
        setFeaturedCards(prev => prev.map(card => 
          card.slot === editingCard.slot 
            ? {
                ...card,
                title: formData.title,
                description: formData.description,
                image: formData.image,
                isActive: true
              }
            : card
        ));

        setSubmitStatus('success');
        alert('Featured Cards Updated!');
        setEditingCard(null);
        setFormData({ title: '', description: '', image: '' });

        setTimeout(() => setSubmitStatus(null), 3000);
      }
    } catch (error) {
      console.error('Error updating featured card:', error);
      setSubmitStatus('error');
      alert('Error updating featured card. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setEditingCard(null);
    setFormData({ title: '', description: '', image: '' });
    setSubmitStatus(null);
  };

  const toggleCardStatus = async (cardId) => {
    try {
      const card = featuredCards.find(c => c.id === cardId);
      if (card && card.title) {
        await axios.patch(`/api/featured-cards/slot/${card.slot}/toggle`);
        setFeaturedCards(prev => prev.map(card => 
          card.id === cardId ? { ...card, isActive: !card.isActive } : card
        ));
      }
    } catch (error) {
      console.error('Error toggling card status:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manage Most Popular Section</h1>
          <p className="text-gray-600 mt-1">Edit the featured cards displayed on your homepage</p>
        </div>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-green-600 text-xl">✅</span>
          <div>
            <p className="text-green-800 font-medium">Card updated successfully!</p>
            <p className="text-green-600 text-sm">Your changes are now live on the homepage.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <span className="text-red-600 text-xl">❌</span>
          <div>
            <p className="text-red-800 font-medium">Update failed!</p>
            <p className="text-red-600 text-sm">Please check your information and try again.</p>
          </div>
        </div>
      )}

      {/* Featured Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">Slot {card.slot}</h3>
                <p className="text-sm text-gray-500">Featured Card Position</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleCardStatus(card.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    card.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {card.isActive ? '✅ Active' : '⏸️ Inactive'}
                </button>
              </div>
            </div>

            {/* Card Preview */}
            <div className="relative">
              {card.image ? (
                <>
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`w-full h-48 object-cover transition-all ${
                      !card.isActive ? 'grayscale opacity-50' : ''
                    }`}
                  />
                  {!card.isActive && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                      <span className="text-white font-medium">Inactive</span>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-4xl mb-2">🖼️</div>
                    <p className="text-sm">No Image</p>
                  </div>
                </div>
              )}
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-2">
                {card.title || 'No Title Set'}
              </h4>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {card.description || 'No description available'}
              </p>
              
              <button
                onClick={() => handleEdit(card)}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
              >
                <span>✏️</span>
                <span>Edit Card</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Form Modal */}
      {editingCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Edit Slot {editingCard.slot}</h2>
                  <p className="text-gray-600">Update the featured card content</p>
                </div>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Card Information</h3>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="e.g., Haikyuu!!"
                      required
                    />
                  </div>

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
                      placeholder="Brief description of the featured content..."
                    />
                  </div>

                  {/* Guidelines */}
                  <div className="bg-orange-50 rounded-lg p-4">
                    <h4 className="font-medium text-orange-800 mb-2">💡 Tips</h4>
                    <ul className="text-sm text-orange-700 space-y-1">
                      <li>• Keep titles short and catchy</li>
                      <li>• Descriptions should be 1-2 sentences</li>
                      <li>• Use high-quality, eye-catching images</li>
                      <li>• Images are automatically optimized</li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Card Image</h3>

                  {/* Cloudinary Image Upload */}
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImage={formData.image}
                    placeholder="Upload Card Image"
                    maxSize={3 * 1024 * 1024} // 3MB for card images
                  />

                  {/* Image Guidelines */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">📐 Image Specs</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Recommended: 300x400px</li>
                      <li>• Aspect ratio: 3:4 (portrait)</li>
                      <li>• Format: PNG, JPG, WebP</li>
                      <li>• Max size: 3MB</li>
                      <li>• Auto-optimized by Cloudinary</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
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
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <span>💾</span>
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMostPopular;