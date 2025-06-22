const mongoose = require('mongoose');

const featuredCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Card title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  image: {
    type: String,
    required: [true, 'Card image URL is required'],
    trim: true
  },
  slot: {
    type: Number,
    required: [true, 'Slot number is required'],
    min: [1, 'Slot must be between 1 and 3'],
    max: [3, 'Slot must be between 1 and 3'],
    unique: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: function() {
      return this.slot;
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to ensure only 3 cards exist
featuredCardSchema.pre('save', async function(next) {
  if (this.isNew) {
    const existingCard = await this.constructor.findOne({ slot: this.slot });
    if (existingCard) {
      // Update existing card instead of creating new one
      existingCard.title = this.title;
      existingCard.description = this.description;
      existingCard.image = this.image;
      existingCard.isActive = this.isActive;
      existingCard.updatedAt = new Date();
      await existingCard.save();
      return next(new Error('Card updated instead of created'));
    }
  }
  next();
});

// Static method to get all featured cards in order
featuredCardSchema.statics.getAllInOrder = function() {
  return this.find({ isActive: true }).sort({ slot: 1 });
};

// Static method to update or create a card for a specific slot
featuredCardSchema.statics.updateSlot = async function(slot, cardData) {
  const existingCard = await this.findOne({ slot });
  
  if (existingCard) {
    // Update existing card
    Object.assign(existingCard, {
      ...cardData,
      slot,
      updatedAt: new Date()
    });
    return await existingCard.save();
  } else {
    // Create new card
    const newCard = new this({
      ...cardData,
      slot,
      updatedAt: new Date()
    });
    return await newCard.save();
  }
};

// Static method to initialize default cards if none exist
featuredCardSchema.statics.initializeDefaults = async function() {
  const count = await this.countDocuments();
  
  if (count === 0) {
    const defaultCards = [
      {
        slot: 1,
        title: 'Haikyuu!!',
        description: 'Complete volleyball manga series with amazing character development',
        image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=Haikyuu',
        isActive: true
      },
      {
        slot: 2,
        title: 'Attack on Titan',
        description: 'Epic story of humanity\'s fight against titans',
        image: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=AOT',
        isActive: true
      },
      {
        slot: 3,
        title: 'Demon Slayer',
        description: 'Beautiful art and compelling demon hunting adventure',
        image: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=DS',
        isActive: true
      }
    ];
    
    return await this.insertMany(defaultCards);
  }
};

// Index for better query performance
featuredCardSchema.index({ slot: 1 });
featuredCardSchema.index({ isActive: 1 });

module.exports = mongoose.model('FeaturedCard', featuredCardSchema);