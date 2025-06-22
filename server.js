const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import routes
const productRoutes = require('./routes/productRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const featuredCardRoutes = require('./routes/featuredCardRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const orderRoutes = require('./routes/orderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Initialize JSON database directories
const fs = require('fs');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('📁 Created data directory for JSON database');
}

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
  crossOriginEmbedderPolicy: false
}));

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://otaku-ghor-frontend.onrender.com',
        'https://otaku-ghor.onrender.com',
        process.env.FRONTEND_URL
      ].filter(Boolean)
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Otaku Ghor API is running with JSON Database!',
    timestamp: new Date().toISOString(),
    database: 'JSON Files Connected ✅',
    databaseType: 'JSON',
    dataDirectory: path.join(__dirname, 'data'),
    environment: process.env.NODE_ENV || 'development',
    port: PORT
  });
});

// API Routes
app.use('/api/admin', adminAuthRoutes);
app.use('/api/products', productRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/featured-cards', featuredCardRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

// Legacy route for admin stats (redirect to products route)
app.get('/api/admin/stats', (req, res) => {
  res.redirect('/api/products/admin/stats');
});

// Legacy search route (redirect to products search)
app.get('/api/search', (req, res) => {
  res.redirect(`/api/products/search?q=${req.query.q || ''}`);
});

// Legacy categories route (redirect to products categories)
app.get('/api/categories', (req, res) => {
  res.redirect('/api/products/categories');
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  
  // Check if build directory exists
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    
    // Handle React routing - send all non-API requests to React app
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
    
    console.log('📱 Serving React build from:', buildPath);
  } else {
    console.log('⚠️ React build directory not found. Run "npm run build" in client directory.');
  }
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // JSON database validation error
  if (err.name === 'ValidationError') {
    const errors = Array.isArray(err.errors) ? err.errors : [err.message];
    return res.status(400).json({ 
      error: 'Validation Error', 
      details: errors 
    });
  }
  
  // Invalid ID format
  if (err.message && err.message.includes('Invalid ID')) {
    return res.status(400).json({ 
      error: 'Invalid ID format' 
    });
  }
  
  // Duplicate key error (for JSON database)
  if (err.message && err.message.includes('already exists')) {
    return res.status(400).json({ 
      error: err.message 
    });
  }
  
  // Default error
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

// 404 handler for API routes only
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'API route not found',
    path: req.path,
    availableRoutes: [
      'GET /api/health',
      'POST /api/admin/login',
      'POST /api/admin/refresh',
      'GET /api/admin/profile',
      'PUT /api/admin/profile',
      'PUT /api/admin/change-password',
      'POST /api/admin/logout',
      'GET /api/admin/verify',
      'GET /api/products',
      'POST /api/products',
      'GET /api/products/:id',
      'PUT /api/products/:id',
      'DELETE /api/products/:id',
      'GET /api/products/search',
      'GET /api/products/categories',
      'GET /api/products/admin/stats',
      'GET /api/banner/current',
      'POST /api/banner',
      'GET /api/featured-cards',
      'POST /api/featured-cards',
      'PUT /api/featured-cards/slot/:slot',
      'GET /api/orders',
      'POST /api/orders',
      'GET /api/analytics/overview',
      'GET /api/analytics/daily-sales',
      'GET /api/analytics/print-type',
      'GET /api/analytics/payment-methods',
      'GET /api/notifications',
      'GET /api/notifications/unread-count',
      'PUT /api/notifications/:id/read',
      'PUT /api/notifications/mark-all-read',
      'POST /api/notifications',
      'DELETE /api/notifications/:id'
    ]
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Otaku Ghor API server running on port ${PORT}`);
  console.log(`📱 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🛍️ Products API: http://localhost:${PORT}/api/products`);
  console.log(`🖼️ Banner API: http://localhost:${PORT}/api/banner`);
  console.log(`⭐ Featured Cards API: http://localhost:${PORT}/api/featured-cards`);
  console.log(`🛒 Orders API: http://localhost:${PORT}/api/orders`);
  console.log(`📊 Analytics API: http://localhost:${PORT}/api/analytics`);
  console.log(`🔔 Notifications API: http://localhost:${PORT}/api/notifications`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🗄️ Database: JSON Files (No MongoDB required)`);
  console.log(`📁 Data Directory: ${path.join(__dirname, 'data')}`);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🌐 Production mode: Serving React build files');
  }
});