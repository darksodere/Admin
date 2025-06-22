const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const Order = require('./models/Order');
const adminAuthRoutes = require('./routes/adminAuthRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock database (in production, use a real database)
let products = [
  {
    id: 1,
    name: 'Naruto Uzumaki Figure',
    price: 89.99,
    image: 'https://via.placeholder.com/300x300/a855f7/ffffff?text=Naruto+Figure',
    category: 'Figures',
    rating: 4.8,
    inStock: true,
    stock: 15,
    description: 'High-quality Naruto Uzumaki figure with detailed craftsmanship'
  },
  {
    id: 2,
    name: 'Attack on Titan Manga Set',
    price: 149.99,
    image: 'https://via.placeholder.com/300x300/e85d5d/ffffff?text=AOT+Manga',
    category: 'Manga',
    rating: 4.9,
    inStock: true,
    stock: 8,
    description: 'Complete Attack on Titan manga collection'
  },
  {
    id: 3,
    name: 'Demon Slayer Keychain',
    price: 12.99,
    image: 'https://via.placeholder.com/300x300/14b8a6/ffffff?text=DS+Keychain',
    category: 'Accessories',
    rating: 4.5,
    inStock: true,
    stock: 50,
    description: 'Cute Demon Slayer character keychain'
  },
  {
    id: 4,
    name: 'Studio Ghibli T-Shirt',
    price: 24.99,
    image: 'https://via.placeholder.com/300x300/3b82f6/ffffff?text=Ghibli+Shirt',
    category: 'Clothing',
    rating: 4.7,
    inStock: false,
    stock: 0,
    description: 'Comfortable Studio Ghibli themed t-shirt'
  },
  {
    id: 5,
    name: 'One Piece Luffy Figure',
    price: 79.99,
    image: 'https://via.placeholder.com/300x300/a855f7/ffffff?text=Luffy+Figure',
    category: 'Figures',
    rating: 4.6,
    inStock: true,
    stock: 12,
    description: 'Dynamic Monkey D. Luffy action figure'
  },
  {
    id: 6,
    name: 'My Hero Academia Poster',
    price: 19.99,
    image: 'https://via.placeholder.com/300x300/e85d5d/ffffff?text=MHA+Poster',
    category: 'Accessories',
    rating: 4.4,
    inStock: true,
    stock: 25,
    description: 'High-quality My Hero Academia poster'
  }
];

let nextId = 7;

// --- In-memory storage for featured cards and banner ---
let featuredCards = [
  { id: 1, title: 'Sample Card 1', slot: 1, active: true },
  { id: 2, title: 'Sample Card 2', slot: 2, active: true },
  { id: 3, title: 'Sample Card 3', slot: 3, active: false }
];
let currentBanner = { image: 'https://via.placeholder.com/1200x400/3b82f6/ffffff?text=Banner' };

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Otaku Ghor API is running!',
    timestamp: new Date().toISOString()
  });
});

// Get all products
app.get('/api/products', (req, res) => {
  const { category, search, limit } = req.query;
  
  let filteredProducts = [...products];
  
  // Filter by category
  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Search functionality
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Limit results
  if (limit) {
    filteredProducts = filteredProducts.slice(0, parseInt(limit));
  }
  
  res.json(filteredProducts);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

// Create new product (Admin only)
app.post('/api/products', (req, res) => {
  const { name, price, category, description, image, stock, rating } = req.body;
  
  if (!name || !price || !category) {
    return res.status(400).json({ error: 'Name, price, and category are required' });
  }
  
  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    category,
    description: description || '',
    image: image || `https://via.placeholder.com/300x300/a855f7/ffffff?text=${encodeURIComponent(name)}`,
    stock: parseInt(stock) || 0,
    rating: parseFloat(rating) || 4.5,
    inStock: parseInt(stock) > 0
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update product (Admin only)
app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const { name, price, category, description, image, stock, rating } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    price: price ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    description: description !== undefined ? description : products[productIndex].description,
    image: image || products[productIndex].image,
    stock: stock !== undefined ? parseInt(stock) : products[productIndex].stock,
    rating: rating ? parseFloat(rating) : products[productIndex].rating,
    inStock: stock !== undefined ? parseInt(stock) > 0 : products[productIndex].inStock
  };
  
  res.json(products[productIndex]);
});

// Delete product (Admin only)
app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  res.json({ message: 'Product deleted successfully', product: deletedProduct });
});

// Place a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, phone, address, paymentMethod, cartItems } = req.body;
    if (!customerName || !phone || !address || !paymentMethod || !cartItems || !cartItems.length) {
      return res.status(400).json({ error: 'Missing required order fields' });
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = new Order({
      customerName,
      phone,
      address,
      paymentMethod,
      cartItems,
      total,
    });
    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order placed!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to place order' });
  }
});

// Get admin stats
app.get('/api/admin/stats', (req, res) => {
  const stats = {
    totalProducts: products.length,
    totalOrders: 1247, // Mock data
    totalRevenue: 45678.90, // Mock data
    lowStockItems: products.filter(p => p.stock < 10).length,
    categories: {
      Figures: products.filter(p => p.category === 'Figures').length,
      Manga: products.filter(p => p.category === 'Manga').length,
      Accessories: products.filter(p => p.category === 'Accessories').length,
      Clothing: products.filter(p => p.category === 'Clothing').length,
      Gaming: products.filter(p => p.category === 'Gaming').length
    },
    recentActivity: [
      { action: 'New order', item: 'Naruto Figure', time: '2 minutes ago' },
      { action: 'Stock updated', item: 'AOT Manga', time: '15 minutes ago' },
      { action: 'New product added', item: 'Demon Slayer Keychain', time: '1 hour ago' }
    ]
  };
  
  res.json(stats);
});

// Get categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Search products
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.status(400).json({ error: 'Search query is required' });
  }
  
  const results = products.filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json(results);
});

// --- Featured Cards Endpoints ---
app.get('/api/featured-cards', (req, res) => {
  res.json(featuredCards);
});
app.post('/api/featured-cards', (req, res) => {
  const card = { ...req.body, id: featuredCards.length + 1 };
  featuredCards.push(card);
  res.status(201).json(card);
});
app.patch('/api/featured-cards/slot/:slot/toggle', (req, res) => {
  const slot = parseInt(req.params.slot);
  const card = featuredCards.find(c => c.slot === slot);
  if (card) {
    card.active = !card.active;
    res.json(card);
  } else {
    res.status(404).json({ error: 'Card not found' });
  }
});

// --- Banner Endpoints ---
app.get('/api/banner/current', (req, res) => {
  res.json(currentBanner);
});
app.post('/api/banner', (req, res) => {
  currentBanner = { ...currentBanner, ...req.body };
  res.json(currentBanner);
});

// --- Orders GET (admin, mock) ---
app.get('/api/orders', (req, res) => {
  // For demo, return empty or mock orders
  res.json([]);
});

// --- Upload Image (mock) ---
app.post('/api/upload/image', (req, res) => {
  res.json({ url: 'https://via.placeholder.com/300x300/14b8a6/ffffff?text=Uploaded+Image' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Analytics router
const analyticsRouter = require('./routes/analytics');
app.use('/api/analytics', analyticsRouter);

// Admin authentication routes
app.use('/api/admin', adminAuthRoutes);

// User authentication routes
const userAuthRoutes = require('./routes/userAuthRoutes');
app.use('/api/auth', userAuthRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Otaku Ghor API server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛍️ Products API: http://localhost:${PORT}/api/products`);
});