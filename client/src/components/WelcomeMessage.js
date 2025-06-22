import React, { useState, useEffect } from 'react';

const WelcomeMessage = ({ user, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 500);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 ${
      visible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="absolute inset-0 bg-gradient-to-br from-anime-purple-900/80 to-anime-pink-900/80 backdrop-blur-sm" />
      
      {/* Floating celebration elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-bounce opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {['🎉', '✨', '🌸', '⭐', '💖', '🎊', '🌟', '💫'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      <div className={`relative bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl transform transition-all duration-700 ${
        visible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
      }`}>
        <div className="text-6xl mb-4 animate-bounce">🎌</div>
        
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-anime-purple-600 to-anime-pink-600 bg-clip-text text-transparent">
          いらっしゃいませ！
        </h1>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to Otaku Ghor!
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          Konnichiwa, <span className="font-bold text-anime-purple-600">{user.firstName}-san</span>! 
          <br />
          Your anime adventure begins now! ✨
        </p>
        
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="px-4 py-2 bg-gradient-to-r from-anime-purple-100 to-anime-pink-100 text-anime-purple-700 rounded-full text-sm font-medium">
            🌸 New Otaku
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          Get ready to explore amazing anime merchandise, connect with fellow otakus, and discover your next favorite series!
        </div>
        
        <div className="flex items-center justify-center space-x-1 text-2xl">
          <span className="animate-pulse">🎭</span>
          <span className="animate-bounce" style={{animationDelay: '0.1s'}}>📚</span>
          <span className="animate-pulse" style={{animationDelay: '0.2s'}}>🛍️</span>
          <span className="animate-bounce" style={{animationDelay: '0.3s'}}>👥</span>
        </div>
        
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 500);
          }}
          className="mt-6 px-6 py-2 bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white rounded-full font-medium hover:scale-105 transition-transform duration-200"
        >
          Let's Start! 🚀
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;