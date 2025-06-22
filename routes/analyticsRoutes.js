const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// Apply admin authentication to all analytics routes
router.use(protect);

// 1. Total Orders & Revenue
router.get('/overview', async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.finalTotal, 0);
    
    res.json({ 
      totalOrders, 
      totalRevenue: Math.round(totalRevenue * 100) / 100 // Round to 2 decimal places
    });
  } catch (error) {
    console.error('Error fetching overview analytics:', error);
    res.status(500).json({ error: 'Failed to fetch overview analytics' });
  }
});

// 2. Sales By Day (last 7 days)
router.get('/daily-sales', async (req, res) => {
  try {
    // Create array for last 7 days
    const last7Days = [...Array(7)].map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        total: 0
      };
    });

    // Get orders from last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const orders = await Order.find({
      createdAt: { $gte: sevenDaysAgo }
    });

    // Aggregate sales by day
    orders.forEach(order => {
      const day = order.createdAt.toISOString().split('T')[0];
      const found = last7Days.find(d => d.date === day);
      if (found) {
        found.total += order.finalTotal;
      }
    });

    // Round totals and reverse to show oldest to newest
    const salesData = last7Days.reverse().map(day => ({
      ...day,
      total: Math.round(day.total * 100) / 100
    }));

    res.json(salesData);
  } catch (error) {
    console.error('Error fetching daily sales:', error);
    res.status(500).json({ error: 'Failed to fetch daily sales data' });
  }
});

// 3. Print Type Breakdown
router.get('/print-type', async (req, res) => {
  try {
    const orders = await Order.find();
    const stats = { yellow: 0, white: 0, regular: 0 };

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        const printType = item.printType.toLowerCase();
        if (printType === 'yellow') {
          stats.yellow += item.quantity;
        } else if (printType === 'white') {
          stats.white += item.quantity;
        } else {
          stats.regular += item.quantity;
        }
      });
    });

    res.json(stats);
  } catch (error) {
    console.error('Error fetching print type analytics:', error);
    res.status(500).json({ error: 'Failed to fetch print type analytics' });
  }
});

// 4. Payment Method Summary
router.get('/payment-methods', async (req, res) => {
  try {
    const orders = await Order.find();
    const summary = { cod: 0, bkash: 0, nagad: 0, rocket: 0 };

    orders.forEach(order => {
      const method = order.paymentMethod.toLowerCase();
      if (summary.hasOwnProperty(method)) {
        summary[method] += 1;
      }
    });

    res.json(summary);
  } catch (error) {
    console.error('Error fetching payment method analytics:', error);
    res.status(500).json({ error: 'Failed to fetch payment method analytics' });
  }
});

// 5. Order Status Breakdown
router.get('/order-status', async (req, res) => {
  try {
    const orders = await Order.find();
    const statusCount = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };

    orders.forEach(order => {
      const status = order.orderStatus.toLowerCase();
      if (statusCount.hasOwnProperty(status)) {
        statusCount[status] += 1;
      }
    });

    res.json(statusCount);
  } catch (error) {
    console.error('Error fetching order status analytics:', error);
    res.status(500).json({ error: 'Failed to fetch order status analytics' });
  }
});

// 6. Monthly Revenue (last 12 months)
router.get('/monthly-revenue', async (req, res) => {
  try {
    const last12Months = [...Array(12)].map((_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return {
        month: date.toISOString().slice(0, 7), // YYYY-MM format
        monthName: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        revenue: 0,
        orders: 0
      };
    });

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const orders = await Order.find({
      createdAt: { $gte: twelveMonthsAgo }
    });

    orders.forEach(order => {
      const month = order.createdAt.toISOString().slice(0, 7);
      const found = last12Months.find(m => m.month === month);
      if (found) {
        found.revenue += order.finalTotal;
        found.orders += 1;
      }
    });

    // Round revenue and reverse to show oldest to newest
    const monthlyData = last12Months.reverse().map(month => ({
      ...month,
      revenue: Math.round(month.revenue * 100) / 100
    }));

    res.json(monthlyData);
  } catch (error) {
    console.error('Error fetching monthly revenue:', error);
    res.status(500).json({ error: 'Failed to fetch monthly revenue data' });
  }
});

// 7. Top Products
router.get('/top-products', async (req, res) => {
  try {
    const orders = await Order.find();
    const productStats = {};

    orders.forEach(order => {
      order.cartItems.forEach(item => {
        if (!productStats[item.productId]) {
          productStats[item.productId] = {
            productId: item.productId,
            name: item.name,
            totalQuantity: 0,
            totalRevenue: 0,
            image: item.image
          };
        }
        productStats[item.productId].totalQuantity += item.quantity;
        productStats[item.productId].totalRevenue += item.price * item.quantity;
      });
    });

    // Convert to array and sort by quantity
    const topProducts = Object.values(productStats)
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10) // Top 10 products
      .map(product => ({
        ...product,
        totalRevenue: Math.round(product.totalRevenue * 100) / 100
      }));

    res.json(topProducts);
  } catch (error) {
    console.error('Error fetching top products:', error);
    res.status(500).json({ error: 'Failed to fetch top products data' });
  }
});

module.exports = router;