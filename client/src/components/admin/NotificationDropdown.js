import React, { useState, useEffect, useRef } from 'react';
import { useNotifications } from '../../context/NotificationContext';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const dropdownRef = useRef(null);
  
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen && notifications.length === 0) {
      fetchNotifications(1, 10);
    }
  }, [isOpen, notifications.length, fetchNotifications]);

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await markAsRead(notification.id);
      } catch (error) {
        console.error('Failed to mark notification as read:', error);
      }
    }
    
    // Handle navigation if actionUrl exists
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const handleDeleteNotification = async (e, notificationId) => {
    e.stopPropagation();
    try {
      await deleteNotification(notificationId);
    } catch (error) {
      console.error('Failed to delete notification:', error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'order': return '🛒';
      case 'product': return '📦';
      case 'user': return '👤';
      case 'inventory': return '📊';
      case 'payment': return '💳';
      case 'system': return '⚙️';
      default: return '🔔';
    }
  };

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 group"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.5 3.5L12 2l1.5 1.5L15 2l1.5 1.5L18 2v4.5L16.5 8 18 9.5V14l-1.5-1.5L15 14l-1.5-1.5L12 14l-1.5-1.5L9 14V9.5L10.5 8 9 6.5V2l1.5 1.5z" />
        </svg>
        
        {/* Dynamic Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse group-hover:animate-bounce">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-pink-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">
                🔔 Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-orange-600 hover:text-orange-700 font-medium hover:bg-orange-100 px-2 py-1 rounded transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-600 mt-1">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            {loading && notifications.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
                <span className="ml-2 text-gray-600">Loading...</span>
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔕</div>
                <p className="text-gray-600">No notifications yet</p>
                <p className="text-sm text-gray-500">You're all caught up!</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {displayedNotifications.map((notification, index) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors relative ${
                      !notification.isRead ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <span className="text-2xl">
                          {notification.icon || getTypeIcon(notification.type)}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className={`text-sm font-medium ${
                            !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          
                          {/* Delete button */}
                          <button
                            onClick={(e) => handleDeleteNotification(e, notification.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">
                            {notification.timeAgo}
                          </span>
                          
                          {/* Priority badge */}
                          <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                        </div>
                      </div>
                      
                      {/* Unread indicator */}
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex items-center justify-between">
                {notifications.length > 5 && !showAll && (
                  <button
                    onClick={() => setShowAll(true)}
                    className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                  >
                    View all {notifications.length} notifications
                  </button>
                )}
                
                {showAll && (
                  <button
                    onClick={() => setShowAll(false)}
                    className="text-sm text-gray-600 hover:text-gray-700"
                  >
                    Show less
                  </button>
                )}
                
                <button
                  onClick={() => {
                    setIsOpen(false);
                    // Navigate to full notifications page if you have one
                    // window.location.href = '/admin/notifications';
                  }}
                  className="text-sm text-gray-600 hover:text-gray-700"
                >
                  View all →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;