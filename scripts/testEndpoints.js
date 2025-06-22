const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

const testEndpoints = async () => {
  console.log('🧪 Testing Backend Endpoints...\n');

  const tests = [
    {
      name: 'Health Check',
      method: 'GET',
      url: `${BASE_URL}/api/health`,
      requiresAuth: false
    },
    {
      name: 'Featured Cards - GET',
      method: 'GET',
      url: `${BASE_URL}/api/featured-cards`,
      requiresAuth: false
    },
    {
      name: 'Banner Current - GET',
      method: 'GET',
      url: `${BASE_URL}/api/banner/current`,
      requiresAuth: false
    },
    {
      name: 'Products - GET',
      method: 'GET',
      url: `${BASE_URL}/api/products`,
      requiresAuth: false
    },
    {
      name: 'Orders - GET',
      method: 'GET',
      url: `${BASE_URL}/api/orders`,
      requiresAuth: true
    },
    {
      name: 'Analytics Overview - GET',
      method: 'GET',
      url: `${BASE_URL}/api/analytics/overview`,
      requiresAuth: true
    }
  ];

  for (const test of tests) {
    try {
      console.log(`Testing: ${test.name}`);
      
      const config = {
        method: test.method.toLowerCase(),
        url: test.url,
        timeout: 5000
      };

      if (test.requiresAuth) {
        console.log(`  ⚠️  Requires authentication - skipping for now`);
        continue;
      }

      const response = await axios(config);
      
      if (response.status >= 200 && response.status < 300) {
        console.log(`  ✅ ${test.name}: ${response.status} - OK`);
        if (response.data) {
          const dataType = Array.isArray(response.data) ? 'Array' : typeof response.data;
          const dataLength = Array.isArray(response.data) ? response.data.length : Object.keys(response.data).length;
          console.log(`     Data: ${dataType} with ${dataLength} items/properties`);
        }
      } else {
        console.log(`  ⚠️  ${test.name}: ${response.status} - Unexpected status`);
      }
    } catch (error) {
      if (error.response) {
        console.log(`  ❌ ${test.name}: ${error.response.status} - ${error.response.statusText}`);
        if (error.response.data?.error) {
          console.log(`     Error: ${error.response.data.error}`);
        }
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`  ❌ ${test.name}: Server not running (Connection refused)`);
      } else {
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }
    console.log('');
  }

  console.log('🎯 Endpoint Test Summary:');
  console.log('- All public endpoints should return 200 OK');
  console.log('- Auth-protected endpoints should return 401 without token');
  console.log('- If server is not running, all tests will fail with connection refused');
  console.log('\n📝 To test authenticated endpoints:');
  console.log('1. Login via /api/admin/login to get a token');
  console.log('2. Add Authorization header: Bearer <token>');
  console.log('3. Test protected endpoints like /api/analytics/*');
};

// Run the tests
testEndpoints().catch(console.error);