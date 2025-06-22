import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { MobileBottomNav, useIsMobile } from './MobileOptimizations';

const MobileLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const { isAuthenticated } = useAuth();
  const { isMobileOrTablet } = useIsMobile();
  const [activeTab, setActiveTab] = useState('home');

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setActiveTab('home');
    else if (path === '/shop') setActiveTab('shop');
    else if (path === '/community') setActiveTab('community');
    else if (path === '/cart') setActiveTab('cart');
    else if (path === '/profile' || path === '/login') setActiveTab('profile');
  }, [location.pathname]);

  const cartItemCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: '🏠',
      path: '/'
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: '🛍️',
      path: '/shop'
    },
    {
      id: 'community',
      label: 'Community',
      icon: '👥',
      path: '/community'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: '🛒',
      path: '/cart',
      badge: cartItemCount > 0 ? cartItemCount : null
    },
    {
      id: 'profile',
      label: isAuthenticated() ? 'Profile' : 'Login',
      icon: isAuthenticated() ? '👤' : '🔐',
      path: isAuthenticated() ? '/profile' : '/login'
    }
  ];

  const handleTabChange = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    if (tab) {
      navigate(tab.path);
      setActiveTab(tabId);
    }
  };

  // Don't show mobile nav on auth pages
  const isAuthPage = ['/login', '/signup', '/admin/login'].includes(location.pathname);
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-purple-50/30 to-anime-pink-50/30">
      {/* Main Content */}
      <div className={`${isMobileOrTablet && !isAuthPage && !isAdminPage ? 'pb-20' : ''}`}>
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      {isMobileOrTablet && !isAuthPage && !isAdminPage && (
        <MobileBottomNav
          activeTab={activeTab}
          onTabChange={handleTabChange}
          tabs={tabs}
        />
      )}

      {/* Mobile-specific styles */}
      <style jsx global>{`
        /* Ensure proper touch targets */
        button, a, input, select, textarea {
          min-height: 44px;
          min-width: 44px;
        }

        /* Improve scrolling on mobile */
        body {
          -webkit-overflow-scrolling: touch;
          overscroll-behavior: contain;
        }

        /* Prevent zoom on input focus */
        @media screen and (max-width: 768px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }

        /* Safe area for devices with notches */
        .safe-area-inset-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }

        .safe-area-inset-top {
          padding-top: env(safe-area-inset-top);
        }

        /* Improve tap highlighting */
        * {
          -webkit-tap-highlight-color: rgba(168, 85, 247, 0.2);
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Hide scrollbar on mobile while keeping functionality */
        @media screen and (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 0px;
            background: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileLayout;