import React, { useState } from 'react';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  showFilters, 
  setShowFilters 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: true,
    brand: false,
    features: false
  });

  const categories = [
    { id: 'all', name: 'All Categories', count: 156 },
    { id: 'manga', name: 'Manga', count: 45 },
    { id: 'figures', name: 'Figures', count: 32 },
    { id: 'accessories', name: 'Accessories', count: 28 },
    { id: 'clothing', name: 'Clothing', count: 24 },
    { id: 'gaming', name: 'Gaming', count: 18 },
    { id: 'art-books', name: 'Art Books', count: 9 }
  ];

  const brands = [
    { id: 'good-smile', name: 'Good Smile Company', count: 15 },
    { id: 'kotobukiya', name: 'Kotobukiya', count: 12 },
    { id: 'bandai', name: 'Bandai', count: 18 },
    { id: 'funko', name: 'Funko Pop', count: 8 },
    { id: 'viz', name: 'VIZ Media', count: 22 }
  ];

  const features = [
    { id: 'limited-edition', name: 'Limited Edition', count: 12 },
    { id: 'pre-order', name: 'Pre-order', count: 8 },
    { id: 'exclusive', name: 'Exclusive', count: 5 },
    { id: 'signed', name: 'Signed', count: 3 },
    { id: 'rare', name: 'Rare', count: 7 }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (type, value) => {
    onFilterChange('priceRange', {
      ...filters.priceRange,
      [type]: parseInt(value)
    });
  };

  return (
    <div className="lg:w-1/4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800 flex items-center">
            <span className="mr-2">🎛️</span>
            Filters
          </h3>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden text-purple-600 p-2 rounded-lg hover:bg-purple-50"
          >
            {showFilters ? '✕' : '☰'}
          </button>
        </div>

        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          {/* Active Filters */}
          {(filters.category !== 'all' || filters.rating > 0 || filters.brands.length > 0) && (
            <div className="pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Active Filters</h4>
                <button
                  onClick={onClearFilters}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.category !== 'all' && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center">
                    {categories.find(c => c.id === filters.category)?.name}
                    <button
                      onClick={() => onFilterChange('category', 'all')}
                      className="ml-2 text-purple-500 hover:text-purple-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.rating > 0 && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm flex items-center">
                    {filters.rating}+ Stars
                    <button
                      onClick={() => onFilterChange('rating', 0)}
                      className="ml-2 text-yellow-500 hover:text-yellow-700"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.brands.map(brand => (
                  <span key={brand} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center">
                    {brands.find(b => b.id === brand)?.name}
                    <button
                      onClick={() => onFilterChange('brands', filters.brands.filter(b => b !== brand))}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Category Filter */}
          <div>
            <button
              onClick={() => toggleSection('category')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-semibold text-gray-700 flex items-center">
                <span className="mr-2">📂</span>
                Category
              </h4>
              <span className={`transform transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.category && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filters.category === category.id}
                        onChange={(e) => onFilterChange('category', e.target.value)}
                        className="mr-3 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-600 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <button
              onClick={() => toggleSection('price')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-semibold text-gray-700 flex items-center">
                <span className="mr-2">💰</span>
                Price Range
              </h4>
              <span className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.price && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceChange('min', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceChange('max', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="1000"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange.max}
                    onChange={(e) => handlePriceChange('max', e.target.value)}
                    className="w-full h-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>৳0</span>
                    <span>৳1000+</span>
                  </div>
                </div>
                {/* Quick Price Filters */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Under ৳50', min: 0, max: 50 },
                    { label: '৳50-100', min: 50, max: 100 },
                    { label: '৳100-200', min: 100, max: 200 },
                    { label: 'Over ৳200', min: 200, max: 1000 }
                  ].map((range, index) => (
                    <button
                      key={index}
                      onClick={() => onFilterChange('priceRange', { min: range.min, max: range.max })}
                      className="px-3 py-2 text-xs border border-gray-300 rounded-lg hover:border-purple-500 hover:text-purple-600 transition-colors"
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div>
            <button
              onClick={() => toggleSection('rating')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-semibold text-gray-700 flex items-center">
                <span className="mr-2">⭐</span>
                Rating
              </h4>
              <span className={`transform transition-transform ${expandedSections.rating ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={filters.rating === rating}
                      onChange={(e) => onFilterChange('rating', parseInt(e.target.value))}
                      className="mr-3 text-yellow-500 focus:ring-yellow-500"
                    />
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                      <span className="text-gray-600 text-sm ml-1">& up</span>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div>
            <button
              onClick={() => toggleSection('brand')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-semibold text-gray-700 flex items-center">
                <span className="mr-2">🏷️</span>
                Brand
              </h4>
              <span className={`transform transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.brand && (
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onFilterChange('brands', [...filters.brands, brand.id]);
                          } else {
                            onFilterChange('brands', filters.brands.filter(b => b !== brand.id));
                          }
                        }}
                        className="mr-3 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-600 group-hover:text-purple-600 transition-colors text-sm">
                        {brand.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {brand.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Features Filter */}
          <div>
            <button
              onClick={() => toggleSection('features')}
              className="flex items-center justify-between w-full mb-3"
            >
              <h4 className="font-semibold text-gray-700 flex items-center">
                <span className="mr-2">✨</span>
                Features
              </h4>
              <span className={`transform transition-transform ${expandedSections.features ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {expandedSections.features && (
              <div className="space-y-2">
                {features.map(feature => (
                  <label key={feature.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.features.includes(feature.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            onFilterChange('features', [...filters.features, feature.id]);
                          } else {
                            onFilterChange('features', filters.features.filter(f => f !== feature.id));
                          }
                        }}
                        className="mr-3 text-purple-500 focus:ring-purple-500"
                      />
                      <span className="text-gray-600 group-hover:text-purple-600 transition-colors text-sm">
                        {feature.name}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
                      {feature.count}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Clear All Filters Button */}
          <button
            onClick={onClearFilters}
            className="w-full px-4 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>🗑️</span>
            <span>Clear All Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;