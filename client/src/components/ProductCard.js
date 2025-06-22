  import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onQuickView }) => {
  const { name, price, image, category, rating, inStock, originalPrice, discount, isNew } = product;
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = async () => {
    if (!inStock) return;
    
    setIsAdding(true);
    
    try {
      addToCart(product);
      
      // Show brief feedback
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setIsAdding(false);
    }
  };

  const productInCart = isInCart(product._id || product.id);

  return (
    <div 
      className="relative bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 group cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x300/a855f7/ffffff?text=${encodeURIComponent(name)}`;
          }}
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col space-y-1">
          {!inStock && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
          {isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute top-2 right-2">
          <span className="bg-purple-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>

        {/* Quick View Button */}
        {onQuickView && (
          <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              className="px-4 py-2 bg-white text-gray-800 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              👁️ Quick View
            </button>
          </div>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-2 right-12 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white">
          <span className="text-red-500">❤️</span>
        </button>
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors line-clamp-2 text-lg">
          {name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-sm ${
                  i < Math.floor(rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">({rating || 0})</span>
          {product.reviews && (
            <span className="text-xs text-gray-500">• {product.reviews} reviews</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-purple-600">
              ৳{price}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-lg text-gray-400 line-through">
                ৳{originalPrice}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-xs font-medium ${inStock ? 'text-green-600' : 'text-red-600'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Product Features */}
        {product.features && product.features.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                +{product.features.length - 2} more
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all duration-300 flex items-center justify-center space-x-2 ${
              !inStock 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : productInCart
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : isAdding
                ? 'bg-orange-500 text-white'
                : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
            }`}
            disabled={!inStock || isAdding}
          >
            {!inStock ? (
              <>
                <span>❌</span>
                <span>Out of Stock</span>
              </>
            ) : isAdding ? (
              <>
                <span className="animate-spin">⏳</span>
                <span>Adding...</span>
              </>
            ) : productInCart ? (
              <>
                <span>✅</span>
                <span>In Cart</span>
              </>
            ) : (
              <>
                <span>🛒</span>
                <span>Add to Cart</span>
              </>
            )}
          </button>

          {/* Quick Actions */}
          <button className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
            <span>📤</span>
          </button>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none"></div>
      
      {/* Anime sparkle effects on hover */}
      {isHovered && (
        <>
          <div className="absolute -top-1 -left-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
          <div className="absolute -top-2 -right-2 w-2 h-2 bg-pink-400 rounded-full animate-pulse opacity-75"></div>
          <div className="absolute -bottom-1 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-75"></div>
          <div className="absolute -bottom-2 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-75"></div>
        </>
      )}
    </div>
  );
};

export default ProductCard;