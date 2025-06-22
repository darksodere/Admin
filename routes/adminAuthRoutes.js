const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminJSON = require('../models/AdminJSON');
const { protect } = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret123';

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
    
    const admin = AdminJSON.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
    
    // Include role in JWT
    const accessToken = jwt.sign(
      { id: admin._id, role: admin.role, type: 'admin' }, 
      JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { id: admin._id }, 
      JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );
    
    console.log(`✅ Admin login successful: ${admin.username}`);
    
    res.json({ 
      accessToken, 
      refreshToken,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Server error during login" });
  }
});

// Refresh token endpoint
router.post('/refresh', (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) return res.sendStatus(401);
    
    jwt.verify(refreshToken, JWT_REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.sendStatus(403);
      
      // Get admin to include role in new token
      const admin = AdminJSON.findById(decoded.id);
      if (!admin) return res.sendStatus(403);
      
      const newAccessToken = jwt.sign(
        { id: admin._id, role: admin.role }, 
        JWT_SECRET, 
        { expiresIn: '15m' }
      );
      
      res.json({ 
        accessToken: newAccessToken,
        admin: {
          id: admin._id,
          username: admin.username,
          role: admin.role
        }
      });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: "Server error during token refresh" });
  }
});

// Verify token endpoint
router.get('/verify', protect, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      role: req.admin.role
    }
  });
});

// Get admin profile
router.get('/profile', protect, (req, res) => {
  res.json({
    success: true,
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      role: req.admin.role,
      createdAt: req.admin.createdAt
    }
  });
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true, 
    message: "Logged out successfully" 
  });
});

module.exports = router;