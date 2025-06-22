const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['cod', 'bkash', 'nagad', 'rocket'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  cartItems: [{
    productId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    volume: {
      type: String,
      default: 'Standard'
    },
    printType: {
      type: String,
      default: 'Regular'
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String
  }],
  total: {
    type: Number,
    required: true,
    min: 0
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  finalTotal: {
    type: Number,
    required: true
  },
  notes: {
    type: String,
    trim: true
  },
  trackingNumber: {
    type: String,
    unique: true,
    sparse: true
  }
}, {
  timestamps: true
});

// Generate tracking number before saving
orderSchema.pre('save', function(next) {
  if (this.isNew && !this.trackingNumber) {
    this.trackingNumber = 'OG' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
  }
  next();
});

// Calculate final total
orderSchema.pre('save', function(next) {
  this.finalTotal = this.total + this.shippingCost - this.discount;
  next();
});

// Index for better query performance
orderSchema.index({ createdAt: -1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentMethod: 1 });
orderSchema.index({ trackingNumber: 1 });

module.exports = mongoose.model('Order', orderSchema);