const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const UserJSON = require('../models/UserJSON');
const { protectUser } = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'secret123';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret123';

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName, confirmPassword } = req.body;
    
    // Validation
    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        message: "All fields are required",
        fields: ['username', 'email', 'password', 'firstName', 'lastName']
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    if (username.length < 3) {
      return res.status(400).json({ message: "Username must be at least 3 characters long" });
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    // Check if user already exists
    const existingUser = UserJSON.findByEmail(email) || UserJSON.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ 
        message: existingUser.email === email.toLowerCase() 
          ? "User with this email already exists" 
          : "Username is already taken"
      });
    }

    // Create user
    const userData = {
      username: username.trim(),
      email: email.trim(),
      password,
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };

    const newUser = await UserJSON.create(userData);
    
    // Generate tokens
    const accessToken = jwt.sign(
      { id: newUser._id, role: newUser.role, type: 'user' }, 
      JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { id: newUser._id, type: 'user' }, 
      JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );

    console.log(`✅ User registered successfully: ${newUser.username} (${newUser.email})`);
    
    res.status(201).json({ 
      message: "Account created successfully",
      accessToken, 
      refreshToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        fullName: `${newUser.firstName} ${newUser.lastName}`,
        role: newUser.role,
        avatar: newUser.avatar
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message || "Server error during registration" 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    if (!emailOrUsername || !password) {
      return res.status(400).json({ message: "Email/Username and password are required" });
    }
    
    // Find user by email or username
    let user = UserJSON.findByEmail(emailOrUsername) || UserJSON.findByUsername(emailOrUsername);
    
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: "Account is deactivated. Please contact support." });
    }
    
    const isMatch = await UserJSON.comparePassword(user, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Update last login
    UserJSON.updateLastLogin(user._id);
    
    // Generate tokens
    const accessToken = jwt.sign(
      { id: user._id, role: user.role, type: 'user' }, 
      JWT_SECRET, 
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { id: user._id, type: 'user' }, 
      JWT_REFRESH_SECRET, 
      { expiresIn: '7d' }
    );
    
    console.log(`✅ User login successful: ${user.username} (${user.email})`);
    
    res.json({ 
      message: "Login successful",
      accessToken, 
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName} ${user.lastName}`,
        role: user.role,
        avatar: user.avatar,
        lastLogin: new Date().toISOString()
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
      
      // Ensure this is a user token
      if (decoded.type !== 'user') return res.sendStatus(403);
      
      // Get user to include role in new token
      const user = UserJSON.findById(decoded.id);
      if (!user || !user.isActive) return res.sendStatus(403);
      
      const newAccessToken = jwt.sign(
        { id: user._id, role: user.role, type: 'user' }, 
        JWT_SECRET, 
        { expiresIn: '15m' }
      );
      
      res.json({ 
        accessToken: newAccessToken,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: `${user.firstName} ${user.lastName}`,
          role: user.role,
          avatar: user.avatar
        }
      });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: "Server error during token refresh" });
  }
});

// Verify token endpoint
router.get('/verify', protectUser, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      fullName: `${req.user.firstName} ${req.user.lastName}`,
      role: req.user.role,
      avatar: req.user.avatar
    }
  });
});

// Get user profile
router.get('/profile', protectUser, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      fullName: `${req.user.firstName} ${req.user.lastName}`,
      role: req.user.role,
      avatar: req.user.avatar,
      preferences: req.user.preferences,
      address: req.user.address,
      phone: req.user.phone,
      dateOfBirth: req.user.dateOfBirth,
      lastLogin: req.user.lastLogin,
      createdAt: req.user.createdAt
    }
  });
});

// Update user profile
router.put('/profile', protectUser, async (req, res) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, address, preferences } = req.body;
    
    const updateData = {};
    if (firstName) updateData.firstName = firstName.trim();
    if (lastName) updateData.lastName = lastName.trim();
    if (phone !== undefined) updateData.phone = phone.trim();
    if (dateOfBirth) updateData.dateOfBirth = dateOfBirth;
    if (address) updateData.address = address;
    if (preferences) updateData.preferences = { ...req.user.preferences, ...preferences };
    
    const updatedUser = await UserJSON.updateById(req.user._id, updateData);
    
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        preferences: updatedUser.preferences,
        address: updatedUser.address,
        phone: updatedUser.phone,
        dateOfBirth: updatedUser.dateOfBirth
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: "Server error during profile update" });
  }
});

// Change password
router.put('/change-password', protectUser, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }
    
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }
    
    // Verify current password
    const isMatch = await UserJSON.comparePassword(req.user, currentPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    
    // Update password
    await UserJSON.updateById(req.user._id, { password: newPassword });
    
    res.json({
      success: true,
      message: "Password changed successfully"
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ message: "Server error during password change" });
  }
});

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true, 
    message: "Logged out successfully" 
  });
});

module.exports = router;