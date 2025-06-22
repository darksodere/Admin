const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  author: {
    type: String,
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters'],
    required: function() {
      return this.category === 'Manga' || this.category === 'Light Novel' || this.category === 'Art Books';
    }
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Manga', 'Light Novel', 'Figures', 'Accessories', 'Clothing', 'Gaming', 'Art Books', 'Collectibles'],
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Product image URL is required'],
    trim: true
  },
  volume: {
    type: Number,
    min: [0, 'Volume cannot be negative']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  stock: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  printType: {
    type: String,
    enum: ['Yellow', 'White'],
    required: function() {
      return this.category === 'Manga' || this.category === 'Light Novel';
    }
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Virtual for checking if product is in stock
productSchema.virtual('inStock').get(function() {
  return this.stock > 0 && this.available;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', {
  virtuals: true
});

// Index for better search performance
productSchema.index({ name: 'text', description: 'text', author: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ stock: 1 });
productSchema.index({ author: 1 });

module.exports = mongoose.model('Product', productSchema);