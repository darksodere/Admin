const mongoose = require('mongoose');
const Order = require('../models/Order');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/otakughor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testAnalytics = async () => {
  try {
    console.log('🔍 Testing Analytics Data...\n');

    // Check existing orders
    const existingOrders = await Order.find();
    console.log(`📊 Found ${existingOrders.length} existing orders`);

    if (existingOrders.length === 0) {
      console.log('📝 Creating sample orders for testing...\n');
      
      // Create sample orders for testing
      const sampleOrders = [
        {
          customerName: 'Naruto Uzumaki',
          phone: '01712345678',
          address: 'Hidden Leaf Village, Fire Country',
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          orderStatus: 'delivered',
          cartItems: [
            {
              productId: 'prod1',
              name: 'Attack on Titan Manga Set',
              volume: 'Standard',
              printType: 'yellow',
              price: 1500,
              quantity: 2,
              image: 'https://example.com/aot.jpg'
            }
          ],
          total: 3000,
          shippingCost: 100,
          discount: 0,
          finalTotal: 3100,
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          customerName: 'Monkey D. Luffy',
          phone: '01787654321',
          address: 'Going Merry Ship, Grand Line',
          paymentMethod: 'bkash',
          paymentStatus: 'paid',
          orderStatus: 'shipped',
          cartItems: [
            {
              productId: 'prod2',
              name: 'One Piece Figure Collection',
              volume: 'Premium',
              printType: 'white',
              price: 2500,
              quantity: 1,
              image: 'https://example.com/onepiece.jpg'
            }
          ],
          total: 2500,
          shippingCost: 150,
          discount: 100,
          finalTotal: 2550,
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        },
        {
          customerName: 'Edward Elric',
          phone: '01698765432',
          address: 'Central City, Amestris',
          paymentMethod: 'nagad',
          paymentStatus: 'paid',
          orderStatus: 'processing',
          cartItems: [
            {
              productId: 'prod3',
              name: 'Fullmetal Alchemist Poster',
              volume: 'Large',
              printType: 'regular',
              price: 800,
              quantity: 3,
              image: 'https://example.com/fma.jpg'
            }
          ],
          total: 2400,
          shippingCost: 80,
          discount: 50,
          finalTotal: 2430,
          createdAt: new Date() // Today
        },
        {
          customerName: 'Ichigo Kurosaki',
          phone: '01756789123',
          address: 'Karakura Town, Soul Society',
          paymentMethod: 'rocket',
          paymentStatus: 'paid',
          orderStatus: 'delivered',
          cartItems: [
            {
              productId: 'prod4',
              name: 'Bleach Sword Replica',
              volume: 'Premium',
              printType: 'yellow',
              price: 3500,
              quantity: 1,
              image: 'https://example.com/bleach.jpg'
            },
            {
              productId: 'prod5',
              name: 'Soul Reaper Badge',
              volume: 'Standard',
              printType: 'white',
              price: 500,
              quantity: 2,
              image: 'https://example.com/badge.jpg'
            }
          ],
          total: 4500,
          shippingCost: 120,
          discount: 200,
          finalTotal: 4420,
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        },
        {
          customerName: 'Goku Son',
          phone: '01634567890',
          address: 'Mount Paozu, Earth',
          paymentMethod: 'cod',
          paymentStatus: 'pending',
          orderStatus: 'pending',
          cartItems: [
            {
              productId: 'prod6',
              name: 'Dragon Ball Z Action Figures',
              volume: 'Deluxe',
              printType: 'regular',
              price: 2000,
              quantity: 2,
              image: 'https://example.com/dbz.jpg'
            }
          ],
          total: 4000,
          shippingCost: 100,
          discount: 0,
          finalTotal: 4100,
          createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago
        }
      ];

      await Order.insertMany(sampleOrders);
      console.log('✅ Sample orders created successfully!\n');
    }

    // Test analytics calculations
    console.log('🧮 Testing Analytics Calculations:\n');

    const orders = await Order.find();
    
    // Overview
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalTotal, 0);
    console.log(`📊 Overview:`);
    console.log(`   Total Orders: ${totalOrders}`);
    console.log(`   Total Revenue: ৳${totalRevenue.toLocaleString()}\n`);

    // Daily Sales (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentOrders = orders.filter(order => order.createdAt >= sevenDaysAgo);
    console.log(`📈 Daily Sales (Last 7 Days):`);
    console.log(`   Orders in last 7 days: ${recentOrders.length}`);
    console.log(`   Revenue in last 7 days: ৳${recentOrders.reduce((sum, order) => sum + order.finalTotal, 0).toLocaleString()}\n`);

    // Print Type Breakdown
    const printStats = { yellow: 0, white: 0, regular: 0 };
    orders.forEach(order => {
      order.cartItems.forEach(item => {
        const printType = item.printType.toLowerCase();
        if (printStats.hasOwnProperty(printType)) {
          printStats[printType] += item.quantity;
        }
      });
    });
    console.log(`🎨 Print Type Breakdown:`);
    console.log(`   Yellow: ${printStats.yellow}`);
    console.log(`   White: ${printStats.white}`);
    console.log(`   Regular: ${printStats.regular}\n`);

    // Payment Methods
    const paymentStats = { cod: 0, bkash: 0, nagad: 0, rocket: 0 };
    orders.forEach(order => {
      const method = order.paymentMethod.toLowerCase();
      if (paymentStats.hasOwnProperty(method)) {
        paymentStats[method] += 1;
      }
    });
    console.log(`💳 Payment Methods:`);
    console.log(`   COD: ${paymentStats.cod}`);
    console.log(`   bKash: ${paymentStats.bkash}`);
    console.log(`   Nagad: ${paymentStats.nagad}`);
    console.log(`   Rocket: ${paymentStats.rocket}\n`);

    console.log('✅ Analytics test completed successfully!');
    console.log('🌐 You can now visit: http://localhost:3000/admin/analytics');
    console.log('📝 Make sure to login as admin first at: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Error testing analytics:', error);
  } finally {
    mongoose.connection.close();
  }
};

testAnalytics();