const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Helper: get all orders
async function getAllOrders() {
  return await Order.find();
}

// 1. Overview Metrics
router.get('/overview', async (req, res) => {
  const orders = await getAllOrders();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + (order.finalTotal || 0), 0);
  res.json({ totalOrders, totalRevenue });
});

// 2. Daily Sales (last 7 days)
router.get('/daily-sales', async (req, res) => {
  const orders = await getAllOrders();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const daily = {};
  orders.forEach(order => {
    if (order.createdAt >= sevenDaysAgo) {
      const date = order.createdAt.toISOString().slice(0, 10);
      daily[date] = (daily[date] || 0) + (order.finalTotal || 0);
    }
  });
  res.json(Object.entries(daily).map(([date, total]) => ({ date, total })));
});

// 3. Print Type Breakdown
router.get('/print-type', async (req, res) => {
  const orders = await getAllOrders();
  const printStats = { yellow: 0, white: 0, regular: 0 };
  orders.forEach(order => {
    order.cartItems.forEach(item => {
      const type = (item.printType || '').toLowerCase();
      if (printStats[type] !== undefined) printStats[type] += item.quantity;
    });
  });
  res.json(printStats);
});

// 4. Payment Methods
router.get('/payment-methods', async (req, res) => {
  const orders = await getAllOrders();
  const paymentStats = { cod: 0, bkash: 0, nagad: 0, rocket: 0 };
  orders.forEach(order => {
    const method = (order.paymentMethod || '').toLowerCase();
    if (paymentStats[method] !== undefined) paymentStats[method] += 1;
  });
  res.json(paymentStats);
});

// 5. Order Status
router.get('/order-status', async (req, res) => {
  const orders = await getAllOrders();
  const statusStats = { pending: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0 };
  orders.forEach(order => {
    const status = (order.orderStatus || '').toLowerCase();
    if (statusStats[status] !== undefined) statusStats[status] += 1;
  });
  res.json(statusStats);
});

// 6. Monthly Revenue (last 12 months)
router.get('/monthly-revenue', async (req, res) => {
  const orders = await getAllOrders();
  const monthly = {};
  orders.forEach(order => {
    const month = order.createdAt.toISOString().slice(0, 7);
    if (!monthly[month]) monthly[month] = { total: 0, count: 0 };
    monthly[month].total += order.finalTotal || 0;
    monthly[month].count += 1;
  });
  res.json(Object.entries(monthly).map(([month, data]) => ({ month, ...data })));
});

// 7. Top Products
router.get('/top-products', async (req, res) => {
  const orders = await getAllOrders();
  const productStats = {};
  orders.forEach(order => {
    order.cartItems.forEach(item => {
      if (!productStats[item.productId]) {
        productStats[item.productId] = {
          productId: item.productId,
          name: item.name,
          totalQuantity: 0,
          totalRevenue: 0,
          image: item.image || ''
        };
      }
      productStats[item.productId].totalQuantity += item.quantity;
      productStats[item.productId].totalRevenue += (item.price || 0) * item.quantity;
    });
  });
  const top = Object.values(productStats)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 10);
  res.json(top);
});

module.exports = router;
