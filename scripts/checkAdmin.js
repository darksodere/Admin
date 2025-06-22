const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const checkAdmin = async () => {
  try {
    console.log('🔍 Checking admin account status...\n');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/otaku-ghor');
    console.log('✅ Connected to database');
    
    // Check for existing admin
    const existingAdmin = await Admin.findOne({ username: '01944281278' });
    
    if (existingAdmin) {
      console.log('\n✅ Admin account exists!');
      console.log('👤 Username:', existingAdmin.username);
      console.log('🔑 Role:', existingAdmin.role);
      console.log('📅 Created:', existingAdmin._id.getTimestamp());
      console.log('\n🚀 You can now login to the admin panel:');
      console.log('   URL: http://localhost:3000/admin/login');
      console.log('   Username: 01944281278');
      console.log('   Password: fahim007');
    } else {
      console.log('\n❌ Admin account not found');
      console.log('📝 You need to create the admin account first');
      console.log('\n🔧 Run this command to create admin:');
      console.log('   npm run create-admin');
      console.log('\n   OR');
      console.log('\n   node scripts/createAdmin.js');
    }
    
    // Check total admin count
    const adminCount = await Admin.countDocuments();
    console.log(`\n📊 Total admin accounts: ${adminCount}`);
    
  } catch (error) {
    console.error('\n❌ Error checking admin:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('connection')) {
      console.log('\n🔧 Database connection issue:');
      console.log('1. Check your internet connection');
      console.log('2. Verify MONGODB_URI in .env file');
      console.log('3. Ensure MongoDB Atlas is accessible');
    }
  } finally {
    mongoose.connection.close();
    process.exit(0);
  }
};

checkAdmin();