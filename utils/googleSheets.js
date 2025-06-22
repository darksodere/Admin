const axios = require('axios');

// Google Sheets Web App URL - Replace with your actual URL
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbyCXBqqdqaNp3vMKuKAHkhvRubvbkFU_Ik6w-ESPJAhPlaxkmATlKAmk8VjE_qY09M/exec';

/**
 * Send order data to Google Sheets
 * @param {Object} orderData - Order information
 * @returns {Promise} - Axios response promise
 */
const syncOrderToGoogleSheets = async (orderData) => {
  try {
    // Format the data for Google Sheets
    const formattedData = {
      name: orderData.customerName,
      phone: orderData.phone,
      address: orderData.address,
      paymentMethod: orderData.paymentMethod,
      items: orderData.cartItems.map(item => 
        `${item.name} (${item.quantity}x ${item.printType || 'Regular'})`
      ),
      total: `৳${orderData.finalTotal || orderData.total}`,
      trackingNumber: orderData.trackingNumber,
      orderStatus: orderData.orderStatus || 'pending',
      paymentStatus: orderData.paymentStatus || 'pending',
      notes: orderData.notes || '',
      // Add secret key for security (optional)
      secret: process.env.GOOGLE_SHEETS_SECRET || 'otaku-ghor-2024'
    };

    console.log('📊 Syncing order to Google Sheets:', {
      trackingNumber: formattedData.trackingNumber,
      customer: formattedData.name,
      total: formattedData.total
    });

    const response = await axios.post(GOOGLE_SHEETS_URL, formattedData, {
      timeout: 10000, // 10 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result === 'Success') {
      console.log('✅ Order successfully synced to Google Sheets');
      return { success: true, data: response.data };
    } else {
      console.warn('⚠️ Google Sheets sync returned unexpected response:', response.data);
      return { success: false, error: 'Unexpected response from Google Sheets' };
    }

  } catch (error) {
    console.error('❌ Google Sheets sync failed:', {
      message: error.message,
      code: error.code,
      response: error.response?.data
    });
    
    // Don't throw error - we don't want to fail order creation if sheets sync fails
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data 
    };
  }
};

/**
 * Update order status in Google Sheets
 * @param {string} trackingNumber - Order tracking number
 * @param {Object} statusUpdate - Status update data
 * @returns {Promise} - Axios response promise
 */
const updateOrderStatusInSheets = async (trackingNumber, statusUpdate) => {
  try {
    const updateData = {
      action: 'update',
      trackingNumber,
      orderStatus: statusUpdate.orderStatus,
      paymentStatus: statusUpdate.paymentStatus,
      secret: process.env.GOOGLE_SHEETS_SECRET || 'otaku-ghor-2024'
    };

    console.log('📝 Updating order status in Google Sheets:', trackingNumber);

    const response = await axios.post(GOOGLE_SHEETS_URL, updateData, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data && response.data.result === 'Success') {
      console.log('✅ Order status updated in Google Sheets');
      return { success: true, data: response.data };
    } else {
      console.warn('⚠️ Google Sheets status update returned unexpected response:', response.data);
      return { success: false, error: 'Unexpected response from Google Sheets' };
    }

  } catch (error) {
    console.error('❌ Google Sheets status update failed:', error.message);
    return { 
      success: false, 
      error: error.message,
      details: error.response?.data 
    };
  }
};

module.exports = {
  syncOrderToGoogleSheets,
  updateOrderStatusInSheets
};