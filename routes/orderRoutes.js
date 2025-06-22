const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const { syncOrderToGoogleSheets, updateOrderStatusInSheets } = require('../utils/googleSheets');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, paymentMethod, cartItems, notes } = req.body;

    // Validation
    if (!customerName || !phone || !address || !paymentMethod || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    // Calculate shipping cost (simple logic - can be enhanced)
    let shippingCost = 0;
    if (total < 1000) {
      shippingCost = 60; // Dhaka
    } else if (total < 2000) {
      shippingCost = 40;
    }
    // Free shipping for orders above 2000 BDT

    // Create order
    const newOrder = new Order({
      customerName,
      phone,
      address,
      paymentMethod,
      cartItems,
      total,
      shippingCost,
      notes: notes || ''
    });

    const savedOrder = await newOrder.save();

    // Sync order to Google Sheets (async, don't wait for completion)
    syncOrderToGoogleSheets({
      customerName: savedOrder.customerName,
      phone: savedOrder.phone,
      address: savedOrder.address,
      paymentMethod: savedOrder.paymentMethod,
      cartItems: savedOrder.cartItems,
      total: savedOrder.total,
      finalTotal: savedOrder.finalTotal,
      trackingNumber: savedOrder.trackingNumber,
      orderStatus: savedOrder.orderStatus,
      paymentStatus: savedOrder.paymentStatus,
      notes: savedOrder.notes
    }).catch(error => {
      console.error('Google Sheets sync failed (non-blocking):', error.message);
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: {
        id: savedOrder._id,
        trackingNumber: savedOrder.trackingNumber,
        total: savedOrder.total,
        shippingCost: savedOrder.shippingCost,
        finalTotal: savedOrder.finalTotal,
        paymentMethod: savedOrder.paymentMethod,
        orderStatus: savedOrder.orderStatus
      }
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @desc    Get order by tracking number
// @route   GET /api/orders/track/:trackingNumber
// @access  Public
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;

    const order = await Order.findOne({ trackingNumber });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      order: {
        trackingNumber: order.trackingNumber,
        customerName: order.customerName,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus,
        total: order.finalTotal,
        createdAt: order.createdAt,
        cartItems: order.cartItems
      }
    });

  } catch (error) {
    console.error('Order tracking error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to track order'
    });
  }
});

// @desc    Get all orders (Admin only)
// @route   GET /api/orders/admin
// @access  Private (Admin)
router.get('/admin', protect, checkRole('editor'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status, 
      paymentMethod, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.orderStatus = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const orders = await Order.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    // Get total count for pagination
    const totalOrders = await Order.countDocuments(filter);

    // Calculate stats
    const stats = await Order.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$finalTotal' },
          averageOrderValue: { $avg: '$finalTotal' },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      orders,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
        hasNext: page * limit < totalOrders,
        hasPrev: page > 1
      },
      stats: stats[0] || { totalRevenue: 0, averageOrderValue: 0, totalOrders: 0 }
    });

  } catch (error) {
    console.error('Admin orders fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// @desc    Update order status (Admin only)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin)
router.put('/:id/status', protect, checkRole('editor'), async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Update status fields
    if (orderStatus) order.orderStatus = orderStatus;
    if (paymentStatus) order.paymentStatus = paymentStatus;

    await order.save();

    // Update status in Google Sheets (async, don't wait for completion)
    updateOrderStatusInSheets(order.trackingNumber, {
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus
    }).catch(error => {
      console.error('Google Sheets status update failed (non-blocking):', error.message);
    });

    res.json({
      success: true,
      message: 'Order status updated successfully',
      order: {
        id: order._id,
        trackingNumber: order.trackingNumber,
        orderStatus: order.orderStatus,
        paymentStatus: order.paymentStatus
      }
    });

  } catch (error) {
    console.error('Order status update error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// @desc    Get order statistics (Admin only)
// @route   GET /api/orders/admin/stats
// @access  Private (Admin)
router.get('/admin/stats', protect, checkRole('editor'), async (req, res) => {
  try {
    const { timeRange = '30d' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate;
    
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get comprehensive stats
    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { $sum: '$finalTotal' },
          averageOrderValue: { $avg: '$finalTotal' },
          pendingOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'pending'] }, 1, 0] }
          },
          completedOrders: {
            $sum: { $cond: [{ $eq: ['$orderStatus', 'delivered'] }, 1, 0] }
          }
        }
      }
    ]);

    // Get payment method breakdown
    const paymentStats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$paymentMethod',
          count: { $sum: 1 },
          revenue: { $sum: '$finalTotal' }
        }
      }
    ]);

    res.json({
      success: true,
      stats: stats[0] || {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        pendingOrders: 0,
        completedOrders: 0
      },
      paymentStats,
      timeRange
    });

  } catch (error) {
    console.error('Order stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order statistics'
    });
  }
});

module.exports = router;