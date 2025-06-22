import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import MostPopular from '../components/MostPopular';
import FeaturedProduct from '../components/FeaturedProduct';
import StatsShowcase from '../components/StatsShowcase';
import axios from 'axios';
import SwipeableCardStack from '../components/SwipeableCardStack';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories] = useState(['All', 'Figures', 'Manga', 'Accessories', 'Clothing']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [realStats, setRealStats] = useState({
    manga: 0,
    items: 0,
    customers: 0,
    support: '24/7'
  });

  // Move fetchProducts above useEffect to fix ReferenceError
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      const allProducts = response.data.products || response.data || [];
      
      // Use mockProducts if response is not an array or is empty
      if (Array.isArray(allProducts) && allProducts.length > 0) {
        setProducts(allProducts);
        
        // Calculate real stats
        const mangaCount = allProducts.filter(p => 
          p.category?.toLowerCase().includes('manga') || 
          p.name?.toLowerCase().includes('manga')
        ).length;
        
        setRealStats({
          manga: mangaCount,
          items: allProducts.length,
          customers: 0, // This would come from user registration data
          support: '24/7'
        });
      } else {
        setProducts(mockProducts);
        setRealStats({
          manga: mockProducts.filter(p => p.category === 'Manga').length,
          items: mockProducts.length,
          customers: 0,
          support: '24/7'
        });
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(mockProducts);
      setRealStats({
        manga: mockProducts.filter(p => p.category === 'Manga').length,
        items: mockProducts.length,
        customers: 0,
        support: '24/7'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Ensure products is always an array
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = selectedCategory === 'All' 
    ? safeProducts 
    : safeProducts.filter(product => product.category === selectedCategory);

  const mockProducts = [
    {
      id: 1,
      name: 'Naruto Uzumaki Figure',
      price: 89.99,
      image: 'https://via.placeholder.com/300x300/ff6b35/ffffff?text=Naruto+Figure',
      category: 'Figures',
      rating: 4.8,
      inStock: true,
      isNew: true
    },
    {
      id: 2,
      name: 'Attack on Titan Manga Set',
      price: 149.99,
      image: 'https://via.placeholder.com/300x300/2d4a22/ffffff?text=AOT+Manga',
      category: 'Manga',
      rating: 4.9,
      inStock: true,
      discount: 15
    },
    {
      id: 3,
      name: 'Demon Slayer Keychain',
      price: 12.99,
      image: 'https://via.placeholder.com/300x300/722f37/ffffff?text=DS+Keychain',
      category: 'Accessories',
      rating: 4.5,
      inStock: true
    },
    {
      id: 4,
      name: 'Studio Ghibli T-Shirt',
      price: 24.99,
      image: 'https://via.placeholder.com/300x300/4a90a4/ffffff?text=Ghibli+Tee',
      category: 'Clothing',
      rating: 4.7,
      inStock: false
    },
    {
      id: 5,
      name: 'One Piece Luffy Figure',
      price: 79.99,
      image: 'https://via.placeholder.com/300x300/dc143c/ffffff?text=Luffy+Figure',
      category: 'Figures',
      rating: 4.6,
      inStock: true,
      isNew: true
    },
    {
      id: 6,
      name: 'My Hero Academia Poster',
      price: 19.99,
      image: 'https://via.placeholder.com/300x300/228b22/ffffff?text=MHA+Poster',
      category: 'Accessories',
      rating: 4.4,
      inStock: true,
      discount: 20
    }
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-anime-purple-50 via-anime-pink-50 to-peach-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-32 w-32 border-4 border-anime-purple-200 border-t-anime-purple-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl animate-bounce">🌸</span>
            </div>
          </div>
          <p className="mt-4 text-anime-purple-600 font-medium animate-pulse">Loading amazing anime products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50/30 via-anime-pink-50/30 to-peach-50/30">
      <Hero products={filteredProducts} />
      
      {/* Floating Anime Elements */}
      <div className="fixed top-20 left-10 text-2xl animate-float opacity-30 pointer-events-none z-10">🌸</div>
      <div className="fixed top-40 right-20 text-3xl animate-float opacity-30 pointer-events-none z-10" style={{animationDelay: '1s'}}>⭐</div>
      <div className="fixed bottom-40 left-20 text-2xl animate-float opacity-30 pointer-events-none z-10" style={{animationDelay: '2s'}}>✨</div>
      <div className="fixed bottom-20 right-10 text-2xl animate-float opacity-30 pointer-events-none z-10" style={{animationDelay: '3s'}}>🎌</div>
      
      
      {/* Most Popular Section */}
      <MostPopular />
      
      {/* Featured Product Section */}
      <FeaturedProduct />
      
      {/* Categories Filter */}
      <section className="py-12 bg-gradient-to-r from-white/60 via-anime-purple-50/60 to-anime-pink-50/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-2">Browse by Category</h2>
            <p className="text-gray-600">Find exactly what you're looking for! 🎯</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => {
              const categoryEmojis = {
                'All': '🌟',
                'Figures': '🎎',
                'Manga': '📚',
                'Accessories': '🎀',
                'Clothing': '👕'
              };
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-8 py-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white shadow-xl animate-pulse-glow'
                      : 'bg-white/80 backdrop-blur-sm text-anime-purple-600 hover:bg-white hover:text-anime-purple-700 border-2 border-anime-purple-200 hover:border-anime-purple-300'
                  }`}
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <span className="flex items-center space-x-2">
                    <span className="text-xl group-hover:animate-bounce">{categoryEmojis[category]}</span>
                    <span>{category}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gradient mb-4 font-kosugi">
              Featured Products ✨
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Discover amazing anime merchandise from your favorite series and bring your otaku dreams to life! 🌟
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6 animate-bounce">😢</div>
              <h3 className="text-3xl font-semibold text-gray-700 mb-4">No products found</h3>
              <p className="text-gray-500 text-lg mb-6">Try selecting a different category or check back later!</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="btn-anime btn-primary"
              >
                View All Products
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              
              {/* View More Button */}
              <div className="text-center mt-12">
                <Link to="/shop" className="btn-anime btn-secondary group">
                  <span className="flex items-center space-x-2">
                    <span>View More Products</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-float"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-kosugi">
              Stay Updated with Latest Releases! ✨
            </h2>
            <p className="text-anime-purple-100 text-xl mb-2">
              Get notified about new anime merchandise and exclusive deals
            </p>
            <p className="text-anime-purple-200 text-sm">
              Join 10,000+ otaku who never miss a release! 🎌
            </p>
          </div>
          
          <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-800 placeholder-gray-500 shadow-lg"
                required
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-white text-anime-purple-600 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                disabled={subscribed}
              >
                {subscribed ? '✅ Subscribed!' : 'Subscribe'}
              </button>
            </div>
          </form>
          
          {subscribed && (
            <div className="mt-4 p-4 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
              <p className="text-white font-medium">
                🎉 Welcome to the Otaku family! Check your email for a special welcome gift!
              </p>
            </div>
          )}
          
          {/* Social Proof with Real Stats */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">📚</div>
                <div className="text-xl font-bold text-white">
                  {realStats.manga > 0 ? `${realStats.manga}+` : 'Coming Soon'}
                </div>
                <div className="text-sm text-anime-purple-100">Manga Titles</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">🎭</div>
                <div className="text-xl font-bold text-white">
                  {realStats.items > 0 ? `${realStats.items}+` : 'Loading...'}
                </div>
                <div className="text-sm text-anime-purple-100">Total Products</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">👥</div>
                <div className="text-xl font-bold text-white">
                  {realStats.customers > 0 ? `${realStats.customers}+` : 'Growing'}
                </div>
                <div className="text-sm text-anime-purple-100">Happy Customers</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">🌟</div>
                <div className="text-xl font-bold text-white">{realStats.support}</div>
                <div className="text-sm text-anime-purple-100">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
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

export default HomePage;