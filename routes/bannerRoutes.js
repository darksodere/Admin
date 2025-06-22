const express = require('express');
const router = express.Router();
const {
  getCurrentBanner,
  updateBanner,
  getAllBanners,
  deleteBanner,
  activateBanner
} = require('../controllers/bannerController');

// Public routes
router.get('/current', getCurrentBanner);

// Admin routes (in production, add authentication middleware)
router.get('/', getAllBanners);
router.post('/', updateBanner);
router.put('/', updateBanner); // Support both POST and PUT for banner updates
router.delete('/:id', deleteBanner);
router.patch('/:id/activate', activateBanner);

module.exports = router;