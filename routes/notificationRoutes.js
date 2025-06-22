const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  createNotification,
  deleteNotification
} = require('../controllers/notificationController');

// All routes require authentication
router.use(protect);

// Public routes (for authenticated users)
router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);
router.delete('/:id', deleteNotification);

// Admin/Editor only routes
router.post('/', checkRole('editor'), createNotification);

module.exports = router;