const { syncOrderToGoogleSheets } = require('../utils/googleSheets');

const testGoogleSheetsIntegration = async () => {
  console.log('🧪 Testing Google Sheets Integration...\n');

  // Sample order data
  const testOrder = {
    customerName: 'Naruto Uzumaki',
    phone: '01712345678',
    address: 'Hidden Leaf Village, Fire Country',
    paymentMethod: 'bkash',
    cartItems: [
      {
        name: 'Attack on Titan Manga Set',
        quantity: 2,
        printType: 'yellow',
        price: 1500
      },
      {
        name: 'One Piece Figure',
        quantity: 1,
        printType: 'white',
        price: 2500
      }
    ],
    total: 5500,
    finalTotal: 5600,
    trackingNumber: 'TEST' + Date.now(),
    orderStatus: 'pending',
    paymentStatus: 'pending',
    notes: 'Test order for Google Sheets integration'
  };

  try {
    console.log('📊 Sending test order to Google Sheets...');
    console.log('Order details:', {
      customer: testOrder.customerName,
      total: `৳${testOrder.finalTotal}`,
      tracking: testOrder.trackingNumber,
      items: testOrder.cartItems.length
    });

    const result = await syncOrderToGoogleSheets(testOrder);

    if (result.success) {
      console.log('\n✅ SUCCESS! Test order synced to Google Sheets');
      console.log('📋 Check your Google Sheet to see the new order');
      console.log('🔗 Make sure your GOOGLE_SHEETS_URL is set in .env file');
    } else {
      console.log('\n❌ FAILED! Google Sheets sync failed');
      console.log('Error:', result.error);
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Check your GOOGLE_SHEETS_URL in .env file');
      console.log('2. Verify your Google Apps Script is deployed');
      console.log('3. Ensure the script has proper permissions');
      console.log('4. Test the Apps Script directly in Google');
    }

  } catch (error) {
    console.error('\n💥 EXCEPTION! Test failed with error:');
    console.error(error.message);
    console.log('\n🔧 Check:');
    console.log('1. Internet connection');
    console.log('2. Google Sheets URL format');
    console.log('3. Apps Script deployment status');
  }

  console.log('\n📝 Next steps:');
  console.log('1. Set up your Google Sheet following the guide');
  console.log('2. Deploy the Apps Script as a web app');
  console.log('3. Add the deployment URL to your .env file');
  console.log('4. Run this test again to verify integration');
};

// Run the test
testGoogleSheetsIntegration();