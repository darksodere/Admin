import React, { useState } from 'react';
import ProductCard from './ProductCard';
import ProductQuickView from './ProductQuickView';

const ProductGrid = ({ 
  products, 
  loading, 
  viewMode, 
  sortBy, 
  onSortChange,
  onLoadMore,
  hasMore 
}) => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)', icon: '🔤' },
    { value: 'price-low', label: 'Price (Low to High)', icon: '💰' },
    { value: 'price-high', label: 'Price (High to Low)', icon: '💎' },
    { value: 'rating', label: 'Highest Rated', icon: '⭐' },
    { value: 'newest', label: 'Newest First', icon: '🆕' },
    { value: 'popular', label: 'Most Popular', icon: '🔥' }
  ];

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  if (loading) {
    return (
      <div className="lg:w-3/4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
              <div className="space-y-3">
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
                <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                <div className="bg-gray-300 h-8 rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-3/4">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/30">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">📦</span>
            {products.length} Products Found
          </h2>
          {products.length > 0 && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Showing</span>
              <span className="font-medium text-purple-600">{Math.min(products.length, 12)}</span>
              <span>of</span>
              <span className="font-medium text-purple-600">{products.length}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.icon} {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-600 text-sm">View:</span>
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => {}} // Grid view is default
                className={`p-2 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="Grid View"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => {}} // List view (can be implemented later)
                className={`p-2 transition-colors ${
                  viewMode === 'list'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
                title="List View"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
          <div className="text-6xl mb-4">😢</div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Check your spelling</p>
            <p>• Try more general keywords</p>
            <p>• Remove some filters</p>
          </div>
        </div>
      ) : (
        <>
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard 
                key={product.id || product._id}
                product={product} 
                onQuickView={() => handleQuickView(product)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={onLoadMore}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2 mx-auto"
              >
                <span>📦</span>
                <span>Load More Products</span>
                <span className="animate-bounce">⬇️</span>
              </button>
            </div>
          )}

          {/* Products Per Page Info */}
          <div className="mt-8 text-center text-sm text-gray-600 bg-white/40 backdrop-blur-sm rounded-lg p-3">
            <p>
              Showing <span className="font-medium text-purple-600">{Math.min(products.length, 12)}</span> of{' '}
              <span className="font-medium text-purple-600">{products.length}</span> products
            </p>
          </div>
        </>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </div>
  );
};

export default ProductGrid;