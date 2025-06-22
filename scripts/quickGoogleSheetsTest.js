const axios = require('axios');

const testGoogleSheetsWebhook = async () => {
  const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbyCXBqqdqaNp3vMKuKAHkhvRubvbkFU_Ik6w-ESPJAhPlaxkmATlKAmk8VjE_qY09M/exec';
  
  console.log('🧪 Testing Google Sheets Webhook...\n');
  console.log('📡 Webhook URL:', WEBHOOK_URL);
  
  const testData = {
    name: 'Test Customer',
    phone: '01712345678',
    address: 'Test Address, Dhaka',
    paymentMethod: 'bkash',
    items: ['Test Product (1x Regular)'],
    total: '৳500',
    trackingNumber: 'TEST' + Date.now(),
    orderStatus: 'pending',
    paymentStatus: 'pending',
    notes: 'Test order from backend',
    secret: 'otaku-ghor-2024'
  };

  try {
    console.log('📤 Sending test data...');
    console.log('Test Order:', {
      customer: testData.name,
      total: testData.total,
      tracking: testData.trackingNumber
    });

    const response = await axios.post(WEBHOOK_URL, testData, {
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log('\n✅ SUCCESS!');
    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);
    console.log('\n📋 Check your Google Sheet - the test order should appear!');
    console.log('🔗 Sheet URL: https://docs.google.com/spreadsheets/');

  } catch (error) {
    console.log('\n❌ FAILED!');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Make sure your Google Apps Script is deployed as a web app');
    console.log('2. Check that access is set to "Anyone"');
    console.log('3. Verify the script has the correct permissions');
    console.log('4. Try running the testScript() function in Apps Script editor');
  }
};

testGoogleSheetsWebhook();