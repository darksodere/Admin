const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Notification title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  message: {
    type: String,
    required: [true, 'Notification message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters']
  },
  type: {
    type: String,
    required: true,
    enum: ['order', 'product', 'user', 'system', 'inventory', 'payment'],
    default: 'system'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // For system-wide notifications
  },
  relatedId: {
    type: String, // Can be order ID, product ID, etc.
    required: false
  },
  relatedModel: {
    type: String, // 'Order', 'Product', etc.
    required: false
  },
  actionUrl: {
    type: String, // URL to navigate when notification is clicked
    required: false
  },
  icon: {
    type: String,
    default: '🔔'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  readAt: {
    type: Date,
    required: false
  }
}, {
  timestamps: true
});

// Index for better query performance
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, priority: 1 });
notificationSchema.index({ createdAt: -1 });

// Virtual for time ago
notificationSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
});

// Ensure virtual fields are serialized
notificationSchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('Notification', notificationSchema);