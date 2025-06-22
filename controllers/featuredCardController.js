const FeaturedCard = require('../models/FeaturedCard');

// Get all featured cards in order
const getAllFeaturedCards = async (req, res) => {
  try {
    const cards = await FeaturedCard.getAllInOrder();
    
    // If no cards exist, initialize defaults
    if (cards.length === 0) {
      await FeaturedCard.initializeDefaults();
      const defaultCards = await FeaturedCard.getAllInOrder();
      return res.json(defaultCards);
    }
    
    res.json(cards);
  } catch (error) {
    console.error('Error fetching featured cards:', error);
    res.status(500).json({ error: 'Failed to fetch featured cards' });
  }
};

// Get featured card by slot
const getFeaturedCardBySlot = async (req, res) => {
  try {
    const { slot } = req.params;
    
    if (slot < 1 || slot > 3) {
      return res.status(400).json({ error: 'Slot must be between 1 and 3' });
    }
    
    const card = await FeaturedCard.findOne({ slot: parseInt(slot) });
    
    if (!card) {
      return res.status(404).json({ error: 'Featured card not found' });
    }
    
    res.json(card);
  } catch (error) {
    console.error('Error fetching featured card:', error);
    res.status(500).json({ error: 'Failed to fetch featured card' });
  }
};

// Update or create featured card for specific slot
const updateFeaturedCard = async (req, res) => {
  try {
    const { slot } = req.params;
    const cardData = req.body;
    
    if (slot < 1 || slot > 3) {
      return res.status(400).json({ error: 'Slot must be between 1 and 3' });
    }
    
    // Validate required fields
    if (!cardData.title || !cardData.image) {
      return res.status(400).json({ error: 'Title and image are required' });
    }
    
    const card = await FeaturedCard.updateSlot(parseInt(slot), cardData);
    
    res.json({
      message: 'Featured card updated successfully',
      card
    });
  } catch (error) {
    console.error('Error updating featured card:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Failed to update featured card' });
  }
};

// Create new featured card (POST method)
const createFeaturedCard = async (req, res) => {
  try {
    const cardData = req.body;
    
    // Validate required fields
    if (!cardData.title || !cardData.image || !cardData.slot) {
      return res.status(400).json({ error: 'Title, image, and slot are required' });
    }
    
    if (cardData.slot < 1 || cardData.slot > 3) {
      return res.status(400).json({ error: 'Slot must be between 1 and 3' });
    }
    
    const card = await FeaturedCard.updateSlot(cardData.slot, cardData);
    
    res.status(201).json({
      message: 'Featured card created successfully',
      card
    });
  } catch (error) {
    console.error('Error creating featured card:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Failed to create featured card' });
  }
};

// Toggle featured card active status
const toggleFeaturedCard = async (req, res) => {
  try {
    const { slot } = req.params;
    
    if (slot < 1 || slot > 3) {
      return res.status(400).json({ error: 'Slot must be between 1 and 3' });
    }
    
    const card = await FeaturedCard.findOne({ slot: parseInt(slot) });
    
    if (!card) {
      return res.status(404).json({ error: 'Featured card not found' });
    }
    
    card.isActive = !card.isActive;
    card.updatedAt = new Date();
    await card.save();
    
    res.json({
      message: `Featured card ${card.isActive ? 'activated' : 'deactivated'} successfully`,
      card
    });
  } catch (error) {
    console.error('Error toggling featured card:', error);
    res.status(500).json({ error: 'Failed to toggle featured card' });
  }
};

// Delete featured card
const deleteFeaturedCard = async (req, res) => {
  try {
    const { slot } = req.params;
    
    if (slot < 1 || slot > 3) {
      return res.status(400).json({ error: 'Slot must be between 1 and 3' });
    }
    
    const card = await FeaturedCard.findOneAndDelete({ slot: parseInt(slot) });
    
    if (!card) {
      return res.status(404).json({ error: 'Featured card not found' });
    }
    
    res.json({ message: 'Featured card deleted successfully', card });
  } catch (error) {
    console.error('Error deleting featured card:', error);
    res.status(500).json({ error: 'Failed to delete featured card' });
  }
};

// Reset to default featured cards
const resetToDefaults = async (req, res) => {
  try {
    // Delete all existing cards
    await FeaturedCard.deleteMany({});
    
    // Initialize defaults
    const defaultCards = await FeaturedCard.initializeDefaults();
    
    res.json({
      message: 'Featured cards reset to defaults successfully',
      cards: defaultCards
    });
  } catch (error) {
    console.error('Error resetting featured cards:', error);
    res.status(500).json({ error: 'Failed to reset featured cards' });
  }
};

module.exports = {
  getAllFeaturedCards,
  getFeaturedCardBySlot,
  updateFeaturedCard,
  createFeaturedCard,
  toggleFeaturedCard,
  deleteFeaturedCard,
  resetToDefaults
};