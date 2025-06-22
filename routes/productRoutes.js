const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getAdminStats,
  searchProducts
} = require('../controllers/productController');

// Public routes
router.get('/', getAllProducts);
router.get('/search', searchProducts);
router.get('/categories', getCategories);
router.get('/:id', getProductById);

// Protected routes with role-based access
router.post('/', protect, checkRole('editor'), createProduct); // Editors can create
router.put('/:id', protect, checkRole('editor'), updateProduct); // Editors can update
router.delete('/:id', protect, checkRole('admin'), deleteProduct); // Only admins can delete
router.get('/admin/stats', protect, checkRole('editor'), getAdminStats); // Editors can view stats

module.exports = router;