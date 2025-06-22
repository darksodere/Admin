const jsonDB = require('../utils/jsonDB');
const { createSystemNotification } = require('./notificationController');

const COLLECTION = 'products';

// Get all products with filtering and search
const getAllProducts = async (req, res) => {
  try {
    const { category, search, limit, page = 1, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Get all products
    let products = jsonDB.find(COLLECTION);
    
    // Filter by category
    if (category && category !== 'All') {
      products = products.filter(p => p.category === category);
    }
    
    // Search functionality
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        (p.name && p.name.toLowerCase().includes(searchLower)) ||
        (p.description && p.description.toLowerCase().includes(searchLower)) ||
        (p.author && p.author.toLowerCase().includes(searchLower)) ||
        (p.category && p.category.toLowerCase().includes(searchLower))
      );
    }
    
    // Sort products
    products.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (sortBy === 'createdAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }
      
      if (sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });
    
    // Pagination
    const pageSize = parseInt(limit) || 10;
    const skip = (parseInt(page) - 1) * pageSize;
    const total = products.length;
    const paginatedProducts = products.slice(skip, skip + pageSize);
    
    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / pageSize),
        totalProducts: total,
        hasNext: skip + pageSize < total,
        hasPrev: parseInt(page) > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = jsonDB.findById(COLLECTION, req.params.id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create new product
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Validate required fields
    if (!productData.name || !productData.price || !productData.category) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: ['Name, price, and category are required'] 
      });
    }
    
    // Create new product
    const savedProduct = jsonDB.insertOne(COLLECTION, productData);
    
    // Create notification for new product
    try {
      await createSystemNotification({
        title: 'New Product Added',
        message: `${savedProduct.name} has been added to the inventory.`,
        type: 'product',
        priority: 'medium',
        icon: '📦',
        actionUrl: `/admin/products/${savedProduct._id}`
      });
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError);
      // Don't fail the product creation if notification fails
    }
    
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const product = jsonDB.updateById(COLLECTION, id, updateData);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Create notification for product update if stock is low
    if (updateData.stock !== undefined && updateData.stock < 10 && updateData.stock > 0) {
      try {
        await createSystemNotification({
          title: 'Low Stock Alert',
          message: `${product.name} is running low on stock (${updateData.stock} remaining).`,
          type: 'inventory',
          priority: 'high',
          icon: '⚠️',
          actionUrl: `/admin/products/${product._id}`
        });
      } catch (notificationError) {
        console.error('Failed to create notification:', notificationError);
      }
    }
    
    // Create notification if product goes out of stock
    if (updateData.stock === 0) {
      try {
        await createSystemNotification({
          title: 'Out of Stock',
          message: `${product.name} is now out of stock.`,
          type: 'inventory',
          priority: 'urgent',
          icon: '🚫',
          actionUrl: `/admin/products/${product._id}`
        });
      } catch (notificationError) {
        console.error('Failed to create notification:', notificationError);
      }
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    const product = jsonDB.deleteById(COLLECTION, id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Create notification for product deletion
    try {
      await createSystemNotification({
        title: 'Product Deleted',
        message: `${product.name} has been removed from the inventory.`,
        type: 'product',
        priority: 'medium',
        icon: '🗑️'
      });
    } catch (notificationError) {
      console.error('Failed to create notification:', notificationError);
    }
    
    res.json({ message: 'Product deleted successfully', product });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Get product categories
const getCategories = async (req, res) => {
  try {
    const products = jsonDB.find(COLLECTION);
    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get admin statistics
const getAdminStats = async (req, res) => {
  try {
    const products = jsonDB.find(COLLECTION);
    
    const totalProducts = products.length;
    const lowStockItems = products.filter(p => p.stock < 10 && p.stock > 0).length;
    const outOfStockItems = products.filter(p => p.stock === 0).length;
    const availableProducts = products.filter(p => p.available !== false).length;
    
    // Category breakdown
    const categoryStats = {};
    products.forEach(product => {
      if (product.category) {
        categoryStats[product.category] = (categoryStats[product.category] || 0) + 1;
      }
    });
    
    // Author statistics
    const authors = new Set();
    products.forEach(product => {
      if (product.author && product.author.trim()) {
        authors.add(product.author.trim());
      }
    });
    const authorCount = authors.size;
    
    // Manga-specific statistics
    const mangaCount = products.filter(p => 
      p.category === 'Manga' || p.category === 'Light Novel'
    ).length;
    
    // Genre statistics (using categories as genres)
    const genreCount = Object.keys(categoryStats).length;
    
    // Recent products
    const recentProducts = products
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(p => ({
        _id: p._id,
        name: p.name,
        category: p.category,
        author: p.author,
        createdAt: p.createdAt
      }));
    
    const stats = {
      totalProducts,
      lowStockItems,
      outOfStockItems,
      availableProducts,
      mangaCount,
      authorCount,
      genreCount,
      categories: categoryStats,
      recentProducts,
      // Mock data for orders and revenue (replace with real data when order system is implemented)
      totalOrders: 0,
      totalRevenue: 0
    };
    
    res.json(stats);
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
};

// Search products
const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }
    
    const products = jsonDB.find(COLLECTION);
    const searchLower = q.toLowerCase();
    
    const results = products.filter(product =>
      (product.name && product.name.toLowerCase().includes(searchLower)) ||
      (product.description && product.description.toLowerCase().includes(searchLower)) ||
      (product.category && product.category.toLowerCase().includes(searchLower)) ||
      (product.author && product.author.toLowerCase().includes(searchLower))
    ).slice(0, 20);
    
    res.json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getAdminStats,
  searchProducts
};