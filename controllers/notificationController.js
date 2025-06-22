const fs = require('fs');
const path = require('path');

// JSON database file path
const notificationsFile = path.join(__dirname, '../data/notifications.json');

// Helper function to read notifications from JSON file
const readNotifications = () => {
  try {
    if (!fs.existsSync(notificationsFile)) {
      return [];
    }
    const data = fs.readFileSync(notificationsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading notifications:', error);
    return [];
  }
};

// Helper function to write notifications to JSON file
const writeNotifications = (notifications) => {
  try {
    // Ensure data directory exists
    const dataDir = path.dirname(notificationsFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    fs.writeFileSync(notificationsFile, JSON.stringify(notifications, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing notifications:', error);
    return false;
  }
};

// Helper function to generate ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Helper function to get time ago
const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

// Initialize with some sample notifications if file doesn't exist
const initializeNotifications = () => {
  const notifications = readNotifications();
  if (notifications.length === 0) {
    const sampleNotifications = [
      {
        id: generateId(),
        title: 'Welcome to Otaku Ghor!',
        message: 'Your admin panel is ready. Start uploading amazing anime products!',
        type: 'system',
        priority: 'medium',
        isRead: false,
        userId: null,
        icon: '🎌',
        createdAt: new Date().toISOString()
      },
      {
        id: generateId(),
        title: 'New Product Upload',
        message: 'A new manga has been added to your inventory.',
        type: 'product',
        priority: 'low',
        isRead: false,
        userId: null,
        icon: '📚',
        createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      },
      {
        id: generateId(),
        title: 'Low Stock Alert',
        message: 'Some products are running low on stock. Check inventory.',
        type: 'inventory',
        priority: 'high',
        isRead: false,
        userId: null,
        icon: '⚠️',
        createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
      }
    ];
    
    writeNotifications(sampleNotifications);
    return sampleNotifications;
  }
  return notifications;
};

// Get all notifications for admin (or specific user)
const getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const userId = req.user?.id;
    
    let notifications = readNotifications();
    
    // Filter for admin (show all) or user-specific notifications
    if (req.user?.role !== 'admin' && req.user?.role !== 'editor' && userId) {
      notifications = notifications.filter(n => n.userId === userId || n.userId === null);
    }
    
    // Filter for unread only if requested
    if (unreadOnly === 'true') {
      notifications = notifications.filter(n => !n.isRead);
    }
    
    // Sort by creation date (newest first)
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    // Add timeAgo to each notification
    notifications = notifications.map(n => ({
      ...n,
      timeAgo: getTimeAgo(n.createdAt)
    }));
    
    // Pagination
    const pageSize = parseInt(limit);
    const skip = (parseInt(page) - 1) * pageSize;
    const total = notifications.length;
    const paginatedNotifications = notifications.slice(skip, skip + pageSize);
    
    // Count unread notifications
    const unreadCount = notifications.filter(n => !n.isRead).length;
    
    res.json({
      notifications: paginatedNotifications,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / pageSize),
        totalNotifications: total,
        unreadCount,
        hasNext: skip + pageSize < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Get unread notification count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user?.id;
    let notifications = readNotifications();
    
    // Filter for admin (show all) or user-specific notifications
    if (req.user?.role !== 'admin' && req.user?.role !== 'editor' && userId) {
      notifications = notifications.filter(n => n.userId === userId || n.userId === null);
    }
    
    const unreadCount = notifications.filter(n => !n.isRead).length;
    
    res.json({ unreadCount });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
};

// Mark notification as read
const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const notifications = readNotifications();
    const notificationIndex = notifications.findIndex(n => n.id === id);
    
    if (notificationIndex === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    const notification = notifications[notificationIndex];
    
    // Check permissions
    if (req.user?.role !== 'admin' && req.user?.role !== 'editor' && 
        notification.userId !== userId && notification.userId !== null) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    // Mark as read
    notifications[notificationIndex] = {
      ...notification,
      isRead: true,
      readAt: new Date().toISOString()
    };
    
    writeNotifications(notifications);
    
    res.json(notifications[notificationIndex]);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ error: 'Failed to mark notification as read' });
  }
};

// Mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    const notifications = readNotifications();
    
    let modifiedCount = 0;
    const updatedNotifications = notifications.map(notification => {
      // Check if user can mark this notification as read
      const canMarkAsRead = req.user?.role === 'admin' || req.user?.role === 'editor' ||
                           notification.userId === userId || notification.userId === null;
      
      if (canMarkAsRead && !notification.isRead) {
        modifiedCount++;
        return {
          ...notification,
          isRead: true,
          readAt: new Date().toISOString()
        };
      }
      
      return notification;
    });
    
    writeNotifications(updatedNotifications);
    
    res.json({ 
      message: 'All notifications marked as read',
      modifiedCount 
    });
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    res.status(500).json({ error: 'Failed to mark all notifications as read' });
  }
};

// Create new notification (admin only)
const createNotification = async (req, res) => {
  try {
    const { title, message, type = 'system', priority = 'medium', userId = null, icon = '🔔' } = req.body;
    
    if (!title || !message) {
      return res.status(400).json({ error: 'Title and message are required' });
    }
    
    const notifications = readNotifications();
    
    const newNotification = {
      id: generateId(),
      title: title.trim(),
      message: message.trim(),
      type,
      priority,
      isRead: false,
      userId,
      icon,
      createdAt: new Date().toISOString()
    };
    
    notifications.unshift(newNotification); // Add to beginning
    writeNotifications(notifications);
    
    res.status(201).json(newNotification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

// Delete notification
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const notifications = readNotifications();
    const notificationIndex = notifications.findIndex(n => n.id === id);
    
    if (notificationIndex === -1) {
      return res.status(404).json({ error: 'Notification not found' });
    }
    
    const notification = notifications[notificationIndex];
    
    // Check permissions
    if (req.user?.role !== 'admin' && req.user?.role !== 'editor' && 
        notification.userId !== userId && notification.userId !== null) {
      return res.status(403).json({ error: 'Access denied' });
    }
    
    notifications.splice(notificationIndex, 1);
    writeNotifications(notifications);
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
};

// Helper function to create system notifications
const createSystemNotification = async (data) => {
  try {
    const notifications = readNotifications();
    
    const newNotification = {
      id: generateId(),
      title: data.title,
      message: data.message,
      type: data.type || 'system',
      priority: data.priority || 'medium',
      isRead: false,
      userId: null, // System-wide notification
      icon: data.icon || '🔔',
      createdAt: new Date().toISOString()
    };
    
    notifications.unshift(newNotification);
    writeNotifications(notifications);
    
    return newNotification;
  } catch (error) {
    console.error('Error creating system notification:', error);
    throw error;
  }
};

// Helper function to create user-specific notification
const createUserNotification = async (userId, data) => {
  try {
    const notifications = readNotifications();
    
    const newNotification = {
      id: generateId(),
      title: data.title,
      message: data.message,
      type: data.type || 'user',
      priority: data.priority || 'medium',
      isRead: false,
      userId,
      icon: data.icon || '🔔',
      createdAt: new Date().toISOString()
    };
    
    notifications.unshift(newNotification);
    writeNotifications(notifications);
    
    return newNotification;
  } catch (error) {
    console.error('Error creating user notification:', error);
    throw error;
  }
};

// Initialize notifications on module load
initializeNotifications();
module.exports = {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification,
  createSystemNotification,
  createUserNotification
};