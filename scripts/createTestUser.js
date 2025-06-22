const UserJSON = require('../models/UserJSON');

async function createTestUser() {
  try {
    console.log('Creating test user...');
    
    const testUser = await UserJSON.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    
    console.log('✅ Test user created successfully:');
    console.log('Username:', testUser.username);
    console.log('Email:', testUser.email);
    console.log('Name:', testUser.firstName, testUser.lastName);
    console.log('ID:', testUser._id);
    
  } catch (error) {
    console.error('❌ Error creating test user:', error.message);
  }
}

// Run the script
createTestUser();