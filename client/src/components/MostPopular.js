import React from 'react';
import { Link } from 'react-router-dom';

const MostPopular = () => {
  const popularProducts = [
    {
      id: 'haikyuu',
      title: 'Haikyuu!!',
      description: 'Follow the journey of Shoyo Hinata and his volleyball team as they strive to become champions. Complete manga series and exclusive merchandise.',
      image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=Haikyuu!!',
      link: '/product/haikyuu'
    },
    {
      id: 'demon-slayer',
      title: 'Demon Slayer',
      description: 'Join Tanjiro Kamado in his quest to save his sister and defeat demons. Premium figures, manga volumes, and collectible items available.',
      image: 'https://via.placeholder.com/300x400/dc2626/ffffff?text=Demon+Slayer',
      link: '/product/demon-slayer'
    },
    {
      id: 'spy-x-family',
      title: 'Spy x Family',
      description: 'Experience the heartwarming story of the Forger family. Latest manga volumes, adorable Anya figures, and family-themed merchandise.',
      image: 'https://via.placeholder.com/300x400/059669/ffffff?text=Spy+x+Family',
      link: '/product/spy-x-family'
    }
  ];

  const BookmarkIcon = ({ className }) => (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24"
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
    </svg>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-white via-peach-50 to-anime-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-gray-800 font-kosugi mb-2">
            Most Popular
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularProducts.map((product, index) => (
            <Link
              key={product.id}
              to={product.link}
              className="group block"
            >
              <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-white/20">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-anime-purple-100/30 via-transparent to-anime-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Bookmark Icon */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-anime-purple-100 transition-colors duration-200 cursor-pointer">
                    <BookmarkIcon className="w-4 h-4 text-anime-purple-600 hover:text-anime-purple-700" />
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/300x400/a855f7/ffffff?text=${encodeURIComponent(product.title)}`;
                    }}
                  />
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-anime-purple-700 transition-colors duration-200 font-kosugi">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-anime">
                      {product.description}
                    </p>
                  </div>

                  {/* Action Area */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">⭐</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">(4.9)</span>
                    </div>
                    
                    <div className="flex items-center text-anime-purple-600 group-hover:text-anime-purple-700 transition-colors duration-200">
                      <span className="text-sm font-medium mr-1">View More</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-anime-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-anime-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-anime-purple-600 bg-white border-2 border-anime-purple-200 rounded-xl hover:bg-anime-purple-50 hover:border-anime-purple-300 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span>View All Products</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute top-1/4 left-8 w-2 h-2 bg-anime-purple-300 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-1/4 right-12 w-3 h-3 bg-anime-pink-300 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-3/4 left-1/3 w-2 h-2 bg-anime-mint-300 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default MostPopular;