import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVolume, setSelectedVolume] = useState('Standard');
  const [selectedPrintType, setSelectedPrintType] = useState('Regular');
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { addToCart } = useCart();

  // Check if product is in wishlist when modal opens
  useEffect(() => {
    if (product) {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      const productId = product._id || product.id;
      setIsInWishlist(wishlist.includes(productId));
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const images = product.images || [product.image];
  const volumes = ['Standard', 'Premium', 'Deluxe'];
  const printTypes = ['Regular', 'Yellow', 'White'];

  const handleAddToCart = () => {
    addToCart(product, {
      volume: selectedVolume,
      printType: selectedPrintType,
      quantity: quantity
    });
    onClose();
  };

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const productId = product._id || product.id;
    
    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter(id => id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
    } else {
      // Add to wishlist
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
      }
    }
  };

  const handleShare = (platform) => {
    const productUrl = `${window.location.origin}/product/${product._id || product.id}`;
    const shareText = `Check out this amazing ${product.name} for ৳${product.price}!`;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(productUrl).then(() => {
          alert('Product link copied to clipboard!');
        }).catch(() => {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = productUrl;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
          alert('Product link copied to clipboard!');
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Quick View</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x400/a855f7/ffffff?text=${encodeURIComponent(product.name)}`;
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-purple-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    New
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">({product.rating || 0})</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{product.reviews || 0} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-purple-600">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">৳{product.originalPrice}</span>
                )}
                {product.discount && (
                  <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    -{product.discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {/* Volume Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                <div className="flex space-x-2">
                  {volumes.map((volume) => (
                    <button
                      key={volume}
                      onClick={() => setSelectedVolume(volume)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedVolume === volume
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {volume}
                    </button>
                  ))}
                </div>
              </div>

              {/* Print Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Print Type</label>
                <div className="flex space-x-2">
                  {printTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedPrintType(type)}
                      className={`px-4 py-2 rounded-lg border transition-colors ${
                        selectedPrintType === type
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stock && (
                <span className="text-gray-500 text-sm">({product.stock} available)</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  product.inStock
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleWishlistToggle}
                  className={`py-2 px-4 border rounded-lg transition-colors flex items-center justify-center space-x-2 ${
                    isInWishlist 
                      ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span>{isInWishlist ? '❤️' : '🤍'}</span>
                  <span>{isInWishlist ? 'In Wishlist' : 'Wishlist'}</span>
                </button>
                
                <div className="relative group">
                  <button className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                  
                  {/* Share Dropdown */}
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 min-w-full">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>📘</span>
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>🐦</span>
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>📋</span>
                      <span>Copy Link</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Features */}
            {product.features && (
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-800 mb-2">Features</h3>
                <ul className="space-y-1">
                  {product.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;