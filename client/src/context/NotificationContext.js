import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../config/api';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get('/api/notifications/unread-count');
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      console.error('Error fetching unread count:', error);
      // Don't set error for unread count as it's not critical
    }
  };

  // Fetch all notifications
  const fetchNotifications = async (page = 1, limit = 20, unreadOnly = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get('/api/notifications', {
        params: { page, limit, unreadOnly }
      });
      
      if (page === 1) {
        setNotifications(response.data.notifications);
      } else {
        setNotifications(prev => [...prev, ...response.data.notifications]);
      }
      
      setUnreadCount(response.data.pagination.unreadCount);
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setError('Failed to fetch notifications');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId) => {
    try {
      await axios.put(`/api/notifications/${notificationId}/read`);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === notificationId 
            ? { ...notification, isRead: true, readAt: new Date().toISOString() }
            : notification
        )
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await axios.put('/api/notifications/mark-all-read');
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ 
          ...notification, 
          isRead: true, 
          readAt: new Date().toISOString() 
        }))
      );
      
      setUnreadCount(0);
      return response.data;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
      throw error;
    }
  };

  // Create new notification (admin only)
  const createNotification = async (notificationData) => {
    try {
      const response = await axios.post('/api/notifications', notificationData);
      
      // Add to local state
      setNotifications(prev => [response.data, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      await axios.delete(`/api/notifications/${notificationId}`);
      
      // Remove from local state
      const notification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      // Update unread count if notification was unread
      if (notification && !notification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  };

  // Auto-refresh unread count every 30 seconds
  useEffect(() => {
    fetchUnreadCount();
    
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    createNotification,
    deleteNotification,
    // Helper methods
    hasUnreadNotifications: unreadCount > 0,
    getUnreadNotifications: () => notifications.filter(n => !n.isRead),
    getNotificationsByType: (type) => notifications.filter(n => n.type === type)
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};