import React from 'react';

const FeaturedProduct = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-peach-50 via-white to-anime-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Product Info */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="relative bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl p-8 shadow-2xl hover:scale-105 hover:shadow-3xl transition-all duration-300 group overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 bg-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/30 transform rotate-45"></div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-300/20 to-yellow-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              
              <div className="relative z-10 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <h2 className="text-4xl md:text-5xl font-bold text-white font-kosugi drop-shadow-lg">
                    Haikyuu!!
                  </h2>
                  <p className="text-orange-100 text-lg font-medium">
                    Vol 1–14 Available
                  </p>
                </div>

                {/* Description */}
                <p className="text-white/90 text-base leading-relaxed font-anime max-w-md">
                  Follow Shoyo Hinata's journey with our exclusive manga print collection. 
                  Premium & Yellow editions available.
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <button className="group/btn relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-orange-500 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center space-x-2">
                      <span>Buy Now</span>
                      <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Floating Rating Badge */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500 font-kosugi">8.45</div>
                  <div className="text-xs text-gray-500 -mt-1">Rating</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-6 left-6 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              <div className="absolute bottom-16 right-8 w-2 h-2 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              {/* Background Comic Panel Style */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-peach-100 to-yellow-100 opacity-30"></div>
              
              {/* Diagonal Overlay Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-orange-200/30 to-transparent transform rotate-12"></div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-yellow-200/20 via-transparent to-transparent transform -rotate-12"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-orange-300/20 via-transparent to-transparent transform rotate-45"></div>
              </div>

              {/* Comic Panel Lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-0 w-full h-0.5 bg-orange-400 transform rotate-12"></div>
                <div className="absolute top-1/2 right-0 w-3/4 h-0.5 bg-yellow-400 transform -rotate-6"></div>
                <div className="absolute bottom-1/3 left-1/4 w-1/2 h-0.5 bg-orange-500 transform rotate-3"></div>
              </div>

              {/* Main Image */}
              <div className="relative z-10 h-full">
                <img
                  src="https://via.placeholder.com/500x600/ff865e/ffffff?text=Haikyuu!!+Manga"
                  alt="Haikyuu Manga Collection"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/500x600/ff865e/ffffff?text=Haikyuu!!";
                  }}
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Floating Elements */}
              <div className="absolute top-8 right-8 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-float">
                <span className="text-orange-500 text-xl">🏐</span>
              </div>
              
              <div className="absolute bottom-12 left-8 w-16 h-16 bg-orange-400/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg animate-float" style={{animationDelay: '1s'}}>
                <span className="text-white text-2xl font-bold">⚡</span>
              </div>

              {/* Corner Decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-orange-400 opacity-60"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-yellow-400 opacity-60"></div>
            </div>

            {/* Additional Floating Elements */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-orange-400 rounded-full shadow-lg animate-bounce"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-yellow-400 rounded-full shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 -left-6 w-4 h-4 bg-peach-400 rounded-full shadow-lg animate-bounce" style={{animationDelay: '1.5s'}}></div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 text-xl">📚</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Complete Collection</h3>
            <p className="text-gray-600 text-sm">All 14 volumes available in premium quality</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-yellow-500 text-xl">⭐</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Premium Edition</h3>
            <p className="text-gray-600 text-sm">Special covers and exclusive artwork included</p>
          </div>
          
          <div className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-12 h-12 bg-peach-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-peach-500 text-xl">🚚</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-sm">Free delivery on orders over $50</p>
          </div>
        </div>
      </div>

      {/* Background Floating Elements */}
      <div className="absolute top-1/4 left-8 w-3 h-3 bg-orange-300 rounded-full animate-ping opacity-60"></div>
      <div className="absolute bottom-1/3 right-12 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-2/3 left-1/4 w-4 h-4 bg-peach-300 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
    </section>
  );
};

export default FeaturedProduct;