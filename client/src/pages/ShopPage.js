import React, { useState, useEffect } from 'react';
import FilterSidebar from '../components/FilterSidebar';
import ProductGrid from '../components/ProductGrid';
import axios from '../config/api';
import SearchBar from '../components/SearchBar'; // Importing the new SearchBar component

const ShopPage = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Filter state
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: { min: 0, max: 1000 },
    rating: 0,
    brands: [],
    features: [],
    sortBy: 'name',
    inStock: false
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [allProducts, filters, searchQuery]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products');
      const products = response.data.products || response.data || [];
      
      // Add mock data for demonstration if no products
      const mockProducts = products.length === 0 ? generateMockProducts() : products;
      
      setAllProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Use mock data as fallback
      const mockProducts = generateMockProducts();
      setAllProducts(mockProducts);
      setFilteredProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const generateMockProducts = () => {
    const categories = ['manga', 'figures', 'accessories', 'clothing', 'gaming'];
    const brands = ['good-smile', 'kotobukiya', 'bandai', 'funko', 'viz'];
    const printTypes = ['Regular', 'Yellow', 'White'];
    
    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      name: `Anime Product ${i + 1}`,
      description: `Amazing anime merchandise item ${i + 1} with high quality materials and authentic design.`,
      price: Math.floor(Math.random() * 200) + 20,
      originalPrice: Math.floor(Math.random() * 250) + 50,
      image: `https://via.placeholder.com/300x300/a855f7/ffffff?text=Product+${i + 1}`,
      images: [
        `https://via.placeholder.com/300x300/a855f7/ffffff?text=Product+${i + 1}`,
        `https://via.placeholder.com/300x300/ec4899/ffffff?text=Alt+${i + 1}`,
        `https://via.placeholder.com/300x300/f97316/ffffff?text=Side+${i + 1}`
      ],
      category: categories[i % categories.length],
      brand: brands[i % brands.length],
      rating: (Math.random() * 2 + 3).toFixed(1),
      reviews: Math.floor(Math.random() * 100) + 5,
      inStock: Math.random() > 0.1,
      stock: Math.floor(Math.random() * 50) + 1,
      printType: printTypes[i % printTypes.length],
      volume: ['Standard', 'Premium', 'Deluxe'][i % 3],
      isNew: Math.random() > 0.7,
      discount: Math.random() > 0.6 ? Math.floor(Math.random() * 30) + 10 : null,
      features: [
        'High Quality Materials',
        'Authentic Design',
        'Limited Edition',
        'Collector\'s Item'
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    }));
  };

  const applyFiltersAndSearch = () => {
    let filtered = [...allProducts];

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.brand?.toLowerCase().includes(query) ||
        product.printType?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(product => product.category === filters.category);
    }

    // Apply price filter
    filtered = filtered.filter(product =>
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    );

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => parseFloat(product.rating) >= filters.rating);
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(product => filters.brands.includes(product.brand));
    }

    // Apply features filter
    if (filters.features.length > 0) {
      filtered = filtered.filter(product =>
        filters.features.some(feature =>
          product.features?.some(pf => pf.toLowerCase().includes(feature.replace('-', ' ')))
        )
      );
    }

    // Apply stock filter
    if (filters.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    // Apply sorting
    filtered = applySorting(filtered, filters.sortBy);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const applySorting = (products, sortBy) => {
    return products.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return parseFloat(b.rating) - parseFloat(a.rating);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'popular':
          return (b.reviews || 0) - (a.reviews || 0);
        default: // name
          return a.name.localeCompare(b.name);
      }
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSortChange = (sortBy) => {
    setFilters(prev => ({
      ...prev,
      sortBy
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      priceRange: { min: 0, max: 1000 },
      rating: 0,
      brands: [],
      features: [],
      sortBy: 'name',
      inStock: false
    });
    setSearchQuery('');
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(0, indexOfLastProduct);
  const hasMore = indexOfLastProduct < filteredProducts.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50/30 via-anime-pink-50/30 to-peach-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed top-20 left-10 text-2xl animate-float opacity-20 pointer-events-none z-10">🌸</div>
      <div className="fixed top-40 right-20 text-3xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '1s'}}>⭐</div>
      <div className="fixed bottom-40 left-20 text-2xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '2s'}}>✨</div>
      <div className="fixed bottom-20 right-10 text-2xl animate-float opacity-20 pointer-events-none z-10" style={{animationDelay: '3s'}}>🎌</div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-kosugi">
            🛍️ Anime Shop
          </h1>
          <p className="text-anime-purple-100 text-xl mb-2">
            Discover thousands of amazing anime products
          </p>
          <p className="text-anime-purple-200 text-sm mb-8">
            From manga to figures, we have everything for true otaku! ✨
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="w-full max-w-3xl mx-auto">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="🔍 Search manga, figures, accessories, brands..."
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Section */}
        <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{allProducts.length}</div>
            <div className="text-sm text-gray-600">Total Products</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">{filteredProducts.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">24/7</div>
            <div className="text-sm text-gray-600">Support</div>
          </div>
          <div className="card-anime p-4 text-center">
            <div className="text-2xl font-bold text-gradient">Free</div>
            <div className="text-sm text-gray-600">Shipping ৳1000+</div>
          </div>
        </div>

        {/* Filter Toggle for Mobile */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-white/90 to-anime-purple-50/90 backdrop-blur-sm rounded-2xl border-2 border-anime-purple-200 text-gray-700 hover:bg-white/95 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <span className="text-xl">🎛️</span>
            <span className="font-medium">Filters & Sort</span>
            <span className={`transform transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearAllFilters}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Products Grid */}
          <ProductGrid
            products={currentProducts}
            loading={loading}
            viewMode={viewMode}
            sortBy={filters.sortBy}
            onSortChange={handleSortChange}
            onLoadMore={handleLoadMore}
            hasMore={hasMore}
          />
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center z-50 group"
        title="Back to Top"
      >
        <span className="text-xl group-hover:animate-bounce">↑</span>
      </button>
    </div>
  );
};

export default ShopPage;