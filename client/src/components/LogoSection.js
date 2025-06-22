import { useState } from 'react';

export default function LogoSection({ 
  className = "", 
  size = "large", 
  showText = true,
  animated = true 
}) {
  const [imageError, setImageError] = useState(false);
  
  // Size variants
  const sizeClasses = {
    small: "h-12 w-auto",
    medium: "h-16 w-auto", 
    large: "h-20 w-auto",
    xlarge: "h-24 w-auto"
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <div className={`flex items-center space-x-4 ${animated ? 'group' : ''}`}>
        {/* Logo Image */}
        {!imageError ? (
          <img 
            src="/logo.png" 
            alt="Otaku Ghor Logo" 
            className={`${sizeClasses[size]} drop-shadow-lg ${
              animated ? 'hover:scale-105 transition-transform duration-300 group-hover:drop-shadow-2xl' : ''
            }`}
            onError={handleImageError}
          />
        ) : (
          // Fallback logo if image doesn't exist
          <div className={`${sizeClasses[size]} flex items-center justify-center bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold text-2xl shadow-lg ${
            animated ? 'hover:scale-105 transition-transform duration-300' : ''
          }`} style={{ minWidth: '80px', height: '80px' }}>
            OG
          </div>
        )}
        
        {/* Logo Text */}
        {showText && (
          <div className="text-center">
            <h1 className={`font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent ${
              size === 'small' ? 'text-xl' :
              size === 'medium' ? 'text-2xl' :
              size === 'large' ? 'text-3xl' : 'text-4xl'
            } ${animated ? 'group-hover:scale-105 transition-transform duration-300' : ''}`}>
              Otaku Ghor
            </h1>
            <p className={`text-gray-600 ${
              size === 'small' ? 'text-xs' :
              size === 'medium' ? 'text-sm' :
              'text-base'
            } ${animated ? 'group-hover:text-gray-800 transition-colors duration-300' : ''}`}>
              Your Anime Universe
            </p>
          </div>
        )}
      </div>
      
      {/* Anime sparkle effects */}
      {animated && (
        <div className="absolute pointer-events-none">
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-0 group-hover:opacity-75 transition-opacity duration-300 delay-100"></div>
          <div className="absolute -bottom-2 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-0 group-hover:opacity-75 transition-opacity duration-300 delay-200"></div>
        </div>
      )}
    </div>
  );
}