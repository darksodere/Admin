const express = require('express');
const router = express.Router();
const {
  getAllFeaturedCards,
  getFeaturedCardBySlot,
  updateFeaturedCard,
  createFeaturedCard,
  toggleFeaturedCard,
  deleteFeaturedCard,
  resetToDefaults
} = require('../controllers/featuredCardController');

// Public routes
router.get('/', getAllFeaturedCards);
router.get('/slot/:slot', getFeaturedCardBySlot);

// Admin routes (in production, add authentication middleware)
router.post('/', createFeaturedCard);
router.put('/slot/:slot', updateFeaturedCard);
router.patch('/slot/:slot/toggle', toggleFeaturedCard);
router.delete('/slot/:slot', deleteFeaturedCard);
router.post('/reset', resetToDefaults);

module.exports = router;