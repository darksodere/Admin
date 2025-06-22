const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Banner image URL is required'],
    trim: true
  },
  title: {
    type: String,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
    default: 'Welcome to Otaku Ghor'
  },
  subtitle: {
    type: String,
    trim: true,
    maxlength: [200, 'Subtitle cannot exceed 200 characters'],
    default: 'Your Ultimate Anime & Manga Destination'
  },
  buttonText: {
    type: String,
    trim: true,
    maxlength: [50, 'Button text cannot exceed 50 characters'],
    default: 'Shop Now'
  },
  buttonLink: {
    type: String,
    trim: true,
    default: '/products'
  },
  overlayOpacity: {
    type: Number,
    min: [0, 'Overlay opacity cannot be less than 0'],
    max: [1, 'Overlay opacity cannot be greater than 1'],
    default: 0.4
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to ensure only one active banner exists
bannerSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('isActive')) {
    if (this.isActive) {
      // Deactivate all other banners
      await this.constructor.updateMany(
        { _id: { $ne: this._id } },
        { isActive: false }
      );
    }
  }
  next();
});

// Static method to get the current active banner
bannerSchema.statics.getCurrentBanner = function() {
  return this.findOne({ isActive: true }).sort({ updatedAt: -1 });
};

// Static method to set a new banner (replaces the current one)
bannerSchema.statics.setNewBanner = async function(bannerData) {
  // Deactivate all existing banners
  await this.updateMany({}, { isActive: false });
  
  // Create new banner
  const newBanner = new this({
    ...bannerData,
    isActive: true,
    updatedAt: new Date()
  });
  
  return await newBanner.save();
};

module.exports = mongoose.model('Banner', bannerSchema);