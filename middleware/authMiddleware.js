const jwt = require('jsonwebtoken');
const AdminJSON = require('../models/AdminJSON');
const UserJSON = require('../models/UserJSON');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';

// Admin authentication middleware
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ensure this is an admin token (backward compatibility)
    if (decoded.type && decoded.type !== 'admin') {
      return res.status(403).json({ message: "Admin access required" });
    }
    
    // Get admin from JSON database
    const admin = AdminJSON.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Remove password from admin object
    const { password, ...adminWithoutPassword } = admin;

    // Add admin and user (for role middleware compatibility) to request
    req.admin = adminWithoutPassword;
    req.user = { id: admin._id, role: admin.role }; // For role middleware
    
    next();
    
  } catch (error) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// User authentication middleware
const protectUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Ensure this is a user token
    if (decoded.type !== 'user') {
      return res.status(403).json({ message: "User access required" });
    }
    
    // Get user from JSON database
    const user = UserJSON.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account is deactivated" });
    }

    // Remove password from user object
    const { password, ...userWithoutPassword } = user;

    // Add user to request
    req.user = userWithoutPassword;
    
    next();
    
  } catch (error) {
    console.error('User auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

// Combined authentication middleware (accepts both admin and user tokens)
const protectAny = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (decoded.type === 'user') {
      // Handle user token
      const user = UserJSON.findById(decoded.id);
      
      if (!user || !user.isActive) {
        return res.status(401).json({ message: "User not found or inactive" });
      }

      const { password, ...userWithoutPassword } = user;
      req.user = userWithoutPassword;
      req.userType = 'user';
    } else {
      // Handle admin token (backward compatibility for tokens without type)
      const admin = AdminJSON.findById(decoded.id);
      
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }

      const { password, ...adminWithoutPassword } = admin;
      req.admin = adminWithoutPassword;
      req.user = { id: admin._id, role: admin.role };
      req.userType = 'admin';
    }
    
    next();
    
  } catch (error) {
    console.error('Combined auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expired" });
    }
    
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { protect, protectUser, protectAny };