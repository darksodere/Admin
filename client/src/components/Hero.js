import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../config/api';

const Hero = ({ products }) => {
  const [selected, setSelected] = useState(null);
  const [realStats, setRealStats] = useState({
    manga: 0,
    items: 0,
    support: '24/7'
  });
  
  // Get the top 3 products (fallback to empty array if not available)
  const topProducts = products && products.length > 0 ? products.slice(0, 3) : [];

  // Fetch real statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/api/products');
        const allProducts = response.data.products || response.data || [];
        
        const mangaCount = allProducts.filter(p => 
          p.category?.toLowerCase().includes('manga') || 
          p.name?.toLowerCase().includes('manga')
        ).length;
        
        setRealStats({
          manga: mangaCount,
          items: allProducts.length,
          support: '24/7'
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Keep default values if error
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="relative overflow-hidden bg-peach-300 min-h-screen flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-anime-purple-300 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 right-32 w-40 h-40 bg-anime-pink-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-anime-mint-300 rounded-full blur-xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Product Cards */}
          <div className="relative h-96 lg:h-[500px] order-2 lg:order-1">
            {topProducts.map((product, idx) => {
              // Card positions for the stack effect
              const cardStyles = [
                'absolute top-8 left-8 w-48 h-64 lg:w-56 lg:h-72 z-0',
                'absolute top-4 left-20 w-52 h-68 lg:w-60 lg:h-76 z-10',
                'absolute top-12 left-32 w-44 h-60 lg:w-52 lg:h-68 z-20',
              ];
              const isSelected = selected === idx;
              return (
                <div
                  key={product.id}
                  className={cardStyles[idx] + ` bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 group cursor-pointer ${isSelected ? 'ring-4 ring-anime-purple-400 scale-105 z-30' : ''}`}
                  style={{ rotate: idx === 0 ? '3deg' : idx === 1 ? '-2deg' : '6deg' }}
                  onClick={() => setSelected(idx)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-3/4 object-cover rounded-2xl"
                    onError={e => { e.target.src = 'https://via.placeholder.com/224x288/a855f7/ffffff?text=Product'; }}
                  />
                  <div className="p-2 text-center">
                    <h3 className="font-bold text-base text-gray-800 group-hover:text-anime-purple-600 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">${product.price}</p>
                  </div>
                  {/* View Details Button */}
                  <div className={`transition-all duration-300 ${isSelected ? 'opacity-100 visible' : 'opacity-0 invisible'} flex justify-center pb-2`}>
                    <Link
                      to={`/product/${product.id}`}
                      className="inline-block px-4 py-1 mt-2 text-sm font-semibold text-white bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-full shadow hover:scale-105 transition-transform"
                      onClick={e => e.stopPropagation()}
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
            {/* Floating decorative elements */}
            <div className="absolute top-0 right-8 text-3xl animate-float">✨</div>
            <div className="absolute bottom-8 left-0 text-2xl animate-float" style={{animationDelay: '1s'}}>🌸</div>
            <div className="absolute top-1/2 right-0 text-2xl animate-float" style={{animationDelay: '2s'}}>⭐</div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight font-kosugi">
                High-Quality{' '}
                <span className="text-anime-purple-600">Manga</span>{' '}
                &{' '}
                <span className="text-anime-pink-600">Anime</span>{' '}
                Merchandise
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-anime max-w-lg">
                Exclusive Volumes, Limited Bundles & Original Prints
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Link to="/shop">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-anime-purple-500 via-anime-pink-500 to-anime-blue-500 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-500 overflow-hidden animate-pulse-glow">
                  <span className="absolute inset-0 bg-gradient-to-r from-anime-purple-600 via-anime-pink-600 to-anime-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center space-x-3">
                    <span className="text-2xl animate-bounce">🛍️</span>
                    <span className="font-kosugi">Shop Now</span>
                    <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Floating sparkles around button */}
                  <div className="absolute -top-2 -left-2 text-lg animate-ping opacity-75">✨</div>
                  <div className="absolute -bottom-2 -right-2 text-lg animate-ping opacity-75" style={{animationDelay: '0.5s'}}>⭐</div>
                </button>
              </Link>
            </div>

            {/* Enhanced Stats Section */}
            <div className="pt-12">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-kosugi">
                  🎌 Our Amazing Collection
                </h3>
                <p className="text-gray-600">Discover thousands of authentic anime treasures!</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-anime-purple-100 to-anime-purple-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-anime-purple-200">
                  <div className="text-4xl mb-2">📚</div>
                  <div className="text-3xl font-bold text-anime-purple-600 font-kosugi mb-1">
                    {realStats.manga > 0 ? `${realStats.manga}+` : 'Coming Soon'}
                  </div>
                  <div className="text-sm font-medium text-anime-purple-700">Manga Titles</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {realStats.manga > 0 ? 'Available Now' : 'Loading...'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-anime-pink-100 to-anime-pink-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-anime-pink-200">
                  <div className="text-4xl mb-2">🎭</div>
                  <div className="text-3xl font-bold text-anime-pink-600 font-kosugi mb-1">
                    {realStats.items > 0 ? `${realStats.items}+` : 'Loading...'}
                  </div>
                  <div className="text-sm font-medium text-anime-pink-700">Total Products</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {realStats.items > 0 ? 'In Stock' : 'Coming Soon'}
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-anime-mint-100 to-anime-mint-50 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border border-anime-mint-200">
                  <div className="text-4xl mb-2">🌟</div>
                  <div className="text-3xl font-bold text-anime-mint-600 font-kosugi mb-1">{realStats.support}</div>
                  <div className="text-sm font-medium text-anime-mint-700">Support</div>
                  <div className="text-xs text-gray-500 mt-1">Always Here</div>
                </div>
              </div>
              
                          </div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-anime-purple-400 rounded-full animate-ping"></div>
      <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-anime-pink-400 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-anime-mint-400 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default Hero;