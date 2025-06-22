const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/otaku-ghor');
    
    const username = '01944281278';
    const password = 'fahim007';
    
    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('Admin already exists!');
      process.exit(0);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    await Admin.create({
      username,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin created successfully!');
    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);
    console.log('Role: admin');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

createAdmin();