const bcrypt = require('bcryptjs');
const jsonDB = require('../utils/jsonDB');

const createAdmin = async () => {
  try {
    console.log('🔧 Creating admin account with JSON database...\n');
    
    const username = '01944281278';
    const password = 'fahim007';
    
    // Check if admin exists
    const existingAdmin = jsonDB.findOne('admins', { username });
    if (existingAdmin) {
      console.log('✅ Admin already exists!');
      console.log(`👤 Username: ${existingAdmin.username}`);
      console.log(`🔑 Role: ${existingAdmin.role}`);
      console.log(`📅 Created: ${existingAdmin.createdAt}`);
      console.log('\n🚀 You can now login to the admin panel:');
      console.log('   URL: http://localhost:3000/admin/login');
      console.log(`   Username: ${username}`);
      console.log(`   Password: ${password}`);
      return;
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin
    const newAdmin = jsonDB.insertOne('admins', {
      username,
      password: hashedPassword,
      role: 'admin'
    });
    
    console.log('✅ Admin created successfully!');
    console.log(`👤 Username: ${username}`);
    console.log(`🔑 Password: ${password}`);
    console.log(`📋 Role: admin`);
    console.log(`🆔 ID: ${newAdmin._id}`);
    console.log(`📅 Created: ${newAdmin.createdAt}`);
    
    console.log('\n🚀 Next steps:');
    console.log('1. Start your server: npm start');
    console.log('2. Open browser: http://localhost:3000/admin/login');
    console.log(`3. Login with username: ${username} and password: ${password}`);
    
    console.log('\n📊 Database info:');
    console.log(`📁 Data stored in: server/data/admins.json`);
    console.log(`🗄️ Database type: JSON files (no MongoDB required)`);
    
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  }
};

createAdmin();