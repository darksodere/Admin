import React, { useState, useEffect } from 'react';
import axios from '../config/api';

const StatsShowcase = ({ variant = 'default', className = '' }) => {
  const [animatedStats, setAnimatedStats] = useState({
    manga: 0,
    items: 0,
    customers: 0,
    reviews: 0
  });

  const [realStats, setRealStats] = useState({
    manga: 0,
    items: 0,
    customers: 0,
    reviews: 0
  });

  const [loading, setLoading] = useState(true);

  // Fetch real statistics from the API
  useEffect(() => {
    const fetchRealStats = async () => {
      try {
        setLoading(true);
        
        // Fetch products to get real counts
        const productsResponse = await axios.get('/api/products');
        const products = productsResponse.data.products || productsResponse.data || [];
        
        // Fetch admin stats if available
        let adminStats = null;
        try {
          const adminResponse = await axios.get('/api/admin/stats');
          adminStats = adminResponse.data;
        } catch (error) {
          console.log('Admin stats not available:', error.message);
        }

        // Calculate real statistics
        const mangaCount = products.filter(p => 
          p.category?.toLowerCase().includes('manga') || 
          p.name?.toLowerCase().includes('manga')
        ).length;
        
        const totalItems = products.length;
        
        // Use admin stats if available, otherwise use calculated values
        const stats = {
          manga: mangaCount || 0,
          items: totalItems || 0,
          customers: adminStats?.totalCustomers || 0,
          reviews: adminStats?.totalReviews || products.reduce((sum, p) => sum + (p.reviews || 0), 0)
        };

        setRealStats(stats);
        
        // Start animation after getting real data
        animateNumbers(stats);
        
      } catch (error) {
        console.error('Error fetching real stats:', error);
        // Fallback to basic counts
        const fallbackStats = {
          manga: 0,
          items: 0,
          customers: 0,
          reviews: 0
        };
        setRealStats(fallbackStats);
        setAnimatedStats(fallbackStats);
      } finally {
        setLoading(false);
      }
    };

    fetchRealStats();
  }, []);

  // Animate numbers function
  const animateNumbers = (targetStats) => {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        manga: Math.floor(targetStats.manga * progress),
        items: Math.floor(targetStats.items * progress),
        customers: Math.floor(targetStats.customers * progress),
        reviews: Math.floor(targetStats.reviews * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  };

  const stats = [
    {
      icon: '📚',
      number: loading ? 0 : animatedStats.manga,
      suffix: realStats.manga > 0 ? '+' : '',
      label: 'Manga Titles',
      description: realStats.manga > 0 ? 'Available Now' : 'Coming Soon',
      color: 'purple',
      bgGradient: 'from-anime-purple-100 to-anime-purple-50',
      textColor: 'text-anime-purple-600',
      borderColor: 'border-anime-purple-200'
    },
    {
      icon: '🎭',
      number: loading ? 0 : animatedStats.items,
      suffix: realStats.items > 0 ? '+' : '',
      label: 'Total Products',
      description: realStats.items > 0 ? 'In Stock' : 'Loading...',
      color: 'pink',
      bgGradient: 'from-anime-pink-100 to-anime-pink-50',
      textColor: 'text-anime-pink-600',
      borderColor: 'border-anime-pink-200'
    },
    {
      icon: '👥',
      number: loading ? 0 : animatedStats.customers,
      suffix: realStats.customers > 0 ? '+' : '',
      label: 'Happy Customers',
      description: realStats.customers > 0 ? 'Worldwide' : 'Growing Daily',
      color: 'blue',
      bgGradient: 'from-anime-blue-100 to-anime-blue-50',
      textColor: 'text-anime-blue-600',
      borderColor: 'border-anime-blue-200'
    },
    {
      icon: '⭐',
      number: loading ? 0 : animatedStats.reviews,
      suffix: realStats.reviews > 0 ? '+' : '',
      label: 'Total Reviews',
      description: realStats.reviews > 0 ? 'Satisfied Fans' : 'Be the First!',
      color: 'mint',
      bgGradient: 'from-anime-mint-100 to-anime-mint-50',
      textColor: 'text-anime-mint-600',
      borderColor: 'border-anime-mint-200'
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-3 font-kosugi">
            🎌 Loading Our Stats...
          </h2>
          <p className="text-gray-600">
            Fetching real-time data from our anime universe! ✨
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-8 text-center animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
              <div className="w-16 h-8 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="w-20 h-4 bg-gray-300 rounded mx-auto mb-1"></div>
              <div className="w-16 h-3 bg-gray-300 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-xl p-4 text-center transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg border ${stat.borderColor}`}
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-xl font-bold ${stat.textColor} font-kosugi`}>
              {stat.number.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-xs font-medium text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border ${stat.borderColor} group`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl mb-3 group-hover:animate-bounce">{stat.icon}</div>
            <div className={`text-3xl font-bold ${stat.textColor} font-kosugi mb-1`}>
              {stat.number.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm font-medium text-gray-700">{stat.label}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.description}</div>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-3 font-kosugi">
          🎌 Why Otakus Choose Us
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Join thousands of anime fans who trust us for authentic merchandise, 
          fast shipping, and exceptional service!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.bgGradient} rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl border ${stat.borderColor} group relative overflow-hidden`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full -ml-6 -mb-6"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-4 group-hover:animate-bounce">{stat.icon}</div>
              <div className={`text-4xl font-bold ${stat.textColor} font-kosugi mb-2`}>
                {stat.number.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-lg font-medium text-gray-700 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-4 px-8 py-4 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 rounded-2xl text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
          <span className="text-2xl animate-bounce">🛍️</span>
          <span className="font-bold text-lg">Ready to join our anime family?</span>
          <span className="text-2xl animate-pulse">✨</span>
        </div>
      </div>
    </div>
  );
};

export default StatsShowcase;