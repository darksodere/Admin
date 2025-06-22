const axios = require('axios');

const testLogin = async () => {
  try {
    console.log('🧪 Testing Admin Login...\n');
    
    const loginData = {
      username: '01944281278',
      password: 'fahim007'
    };
    
    console.log('📤 Sending login request...');
    console.log('Username:', loginData.username);
    console.log('Password:', loginData.password);
    console.log('URL: http://localhost:5002/api/admin/login\n');
    
    const response = await axios.post('http://localhost:5002/api/admin/login', loginData, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ LOGIN SUCCESS!');
    console.log('Status:', response.status);
    console.log('Response:', response.data);
    
    if (response.data.accessToken) {
      console.log('\n🔑 Access Token received!');
      console.log('Admin ID:', response.data.admin.id);
      console.log('Username:', response.data.admin.username);
      console.log('Role:', response.data.admin.role);
    }
    
  } catch (error) {
    console.log('❌ LOGIN FAILED!');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Error:', error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
      console.log('❌ Cannot connect to server');
      console.log('Make sure server is running on port 5002');
    } else {
      console.log('Error:', error.message);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure server is running: npm start');
    console.log('2. Check server logs for errors');
    console.log('3. Verify admin account exists');
    console.log('4. Check if port 5002 is accessible');
  }
};

testLogin();