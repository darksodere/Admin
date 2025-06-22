import React, { useState, useEffect } from 'react';

// Mobile detection hook
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return { isMobile, isTablet, isMobileOrTablet: isMobile || isTablet };
};

// Touch-friendly button component
export const TouchButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = `
    relative overflow-hidden font-medium transition-all duration-200 
    transform active:scale-95 select-none touch-manipulation
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
  `;

  const variants = {
    primary: 'bg-gradient-to-r from-anime-purple-500 to-anime-pink-500 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-anime-purple-600 border-2 border-anime-purple-500 hover:bg-anime-purple-50',
    ghost: 'bg-transparent text-anime-purple-600 hover:bg-anime-purple-50'
  };

  const sizes = {
    small: 'px-4 py-2 text-sm rounded-lg min-h-[40px]',
    medium: 'px-6 py-3 text-base rounded-xl min-h-[48px]',
    large: 'px-8 py-4 text-lg rounded-2xl min-h-[56px]'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      {...props}
    >
      <span className={`relative z-10 ${isPressed ? 'scale-95' : ''} transition-transform duration-100`}>
        {children}
      </span>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-active:scale-x-100 transition-transform duration-300 origin-left"></div>
    </button>
  );
};

// Mobile-friendly card component
export const MobileCard = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      className={`
        bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 
        p-4 transition-all duration-300 transform active:scale-98 touch-manipulation
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

// Mobile navigation component
export const MobileBottomNav = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 z-50 md:hidden">
      <div className="flex items-center justify-around py-2 px-4 safe-area-inset-bottom">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200
              min-w-[60px] min-h-[60px] touch-manipulation
              ${activeTab === tab.id 
                ? 'bg-anime-purple-100 text-anime-purple-600 scale-110' 
                : 'text-gray-600 hover:text-anime-purple-600 hover:bg-gray-50'
              }
            `}
          >
            <span className="text-xl mb-1">{tab.icon}</span>
            <span className="text-xs font-medium">{tab.label}</span>
            {tab.badge && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {tab.badge}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// Swipe gesture hook
export const useSwipeGesture = (onSwipeLeft, onSwipeRight, threshold = 50) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
};

// Mobile-friendly input component
export const MobileInput = ({ 
  label, 
  error, 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full px-4 py-4 text-base border-2 rounded-xl transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-anime-purple-200 focus:border-anime-purple-500
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-red-500' : 'border-gray-300'}
            min-h-[48px] touch-manipulation
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};

// Pull-to-refresh component
export const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (isPulling && window.scrollY === 0) {
      const touch = e.touches[0];
      const distance = Math.max(0, touch.clientY - 100);
      setPullDistance(Math.min(distance, 100));
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling && pullDistance > 60) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center bg-anime-purple-50 transition-all duration-200 z-10"
          style={{ height: `${pullDistance}px` }}
        >
          <div className="flex items-center space-x-2 text-anime-purple-600">
            <div className={`${isRefreshing ? 'animate-spin' : ''}`}>
              {isRefreshing ? '⏳' : pullDistance > 60 ? '🔄' : '⬇️'}
            </div>
            <span className="text-sm font-medium">
              {isRefreshing ? 'Refreshing...' : pullDistance > 60 ? 'Release to refresh' : 'Pull to refresh'}
            </span>
          </div>
        </div>
      )}
      
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </div>
  );
};

export default {
  useIsMobile,
  TouchButton,
  MobileCard,
  MobileBottomNav,
  useSwipeGesture,
  MobileInput,
  PullToRefresh
};