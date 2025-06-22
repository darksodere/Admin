import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductPopup = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  // Close popup on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart(product, quantity);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Floating anime elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 text-2xl opacity-30 animate-float">🌸</div>
        <div className="absolute top-40 right-20 text-3xl opacity-30 animate-bounce" style={{animationDelay: '1s'}}>⭐</div>
        <div className="absolute bottom-40 left-20 text-2xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}>✨</div>
        <div className="absolute bottom-20 right-20 text-2xl opacity-30 animate-float" style={{animationDelay: '0.5s'}}>💫</div>
      </div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-slideUp">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">×</span>
        </button>

        {/* Success Animation */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center animate-bounce">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-anime-purple-600 mb-2">Added to Cart!</h3>
              <p className="text-gray-600">Redirecting to continue shopping...</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Left Side - Images */}
          <div className="relative bg-gradient-to-br from-anime-purple-50 to-anime-pink-50 p-6 flex flex-col">
            {/* Discount Badge */}
            {hasDiscount && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  -{discountPercent}% OFF
                </div>
              </div>
            )}

            {/* New Badge */}
            {product.isNew && (
              <div className="absolute top-4 right-16 z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  ✨ NEW
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="flex-1 flex items-center justify-center mb-4">
              <div className="relative w-full max-w-sm aspect-square bg-white rounded-2xl shadow-lg overflow-hidden group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={e => { e.target.src = 'https://via.placeholder.com/400x400/a855f7/ffffff?text=Product'; }}
                />
                
                {/* Image overlay with zoom icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                    <span className="text-xl">🔍</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex justify-center space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === index 
                        ? 'border-anime-purple-500 ring-2 ring-anime-purple-200 scale-110' 
                        : 'border-gray-200 hover:border-anime-purple-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={e => { e.target.src = 'https://via.placeholder.com/64x64/a855f7/ffffff?text=Img'; }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="p-6 flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Product Title */}
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h2>
              
              {/* Category & Brand */}
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                {product.category && (
                  <span className="px-2 py-1 bg-anime-purple-100 text-anime-purple-700 rounded-full">
                    {product.category}
                  </span>
                )}
                {product.brand && (
                  <span className="font-medium">{product.brand}</span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-anime-purple-600">
                  ${product.price}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mb-4">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></span>
              <span className={`font-medium text-sm ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
                {product.stock && product.inStock && ` (${product.stock} left)`}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                <ul className="space-y-1">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-anime-purple-500">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity & Actions */}
            {product.inStock && (
              <div className="mt-auto space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-x-2 border-gray-200 font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                      disabled={product.stock && quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex-1 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white py-3 px-6 rounded-xl font-bold hover:from-anime-purple-600 hover:to-anime-pink-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {addingToCart ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adding...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <span>🛒</span>
                        <span>Add to Cart</span>
                      </span>
                    )}
                  </button>
                  
                  <button className="px-4 py-3 border-2 border-anime-purple-500 text-anime-purple-600 rounded-xl font-medium hover:bg-anime-purple-50 transition-colors duration-200">
                    💖
                  </button>
                </div>

                {/* View Full Details */}
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="block w-full text-center py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  View Full Details →
                </Link>
              </div>
            )}

            {/* Out of Stock Message */}
            {!product.inStock && (
              <div className="mt-auto">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <span className="text-red-600 font-medium">😔 Currently Out of Stock</span>
                  <p className="text-red-500 text-sm mt-1">We'll notify you when it's back!</p>
                </div>
                
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="block w-full text-center py-3 px-6 mt-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
                >
                  View Full Details →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;