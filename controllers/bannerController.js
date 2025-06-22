const Banner = require('../models/Banner');

// Get current active banner
const getCurrentBanner = async (req, res) => {
  try {
    const banner = await Banner.getCurrentBanner();
    
    if (!banner) {
      // Return default banner if none exists
      return res.json({
        image: 'https://via.placeholder.com/1200x400/f97316/ffffff?text=Welcome+to+Otaku+Ghor',
        title: 'Welcome to Otaku Ghor',
        subtitle: 'Your Ultimate Anime & Manga Destination',
        buttonText: 'Shop Now',
        buttonLink: '/products',
        overlayOpacity: 0.4,
        isActive: true
      });
    }
    
    res.json(banner);
  } catch (error) {
    console.error('Error fetching banner:', error);
    res.status(500).json({ error: 'Failed to fetch banner' });
  }
};

// Create or update banner
const updateBanner = async (req, res) => {
  try {
    const bannerData = req.body;
    
    // Validate required fields
    if (!bannerData.image) {
      return res.status(400).json({ error: 'Banner image is required' });
    }
    
    // Set new banner (this will deactivate all others)
    const banner = await Banner.setNewBanner(bannerData);
    
    res.json({
      message: 'Banner updated successfully',
      banner
    });
  } catch (error) {
    console.error('Error updating banner:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: 'Validation failed', details: errors });
    }
    res.status(500).json({ error: 'Failed to update banner' });
  }
};

// Get all banners (for admin history)
const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ updatedAt: -1 });
    res.json(banners);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'Failed to fetch banners' });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    const banner = await Banner.findByIdAndDelete(id);
    
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    
    res.json({ message: 'Banner deleted successfully', banner });
  } catch (error) {
    console.error('Error deleting banner:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid banner ID' });
    }
    res.status(500).json({ error: 'Failed to delete banner' });
  }
};

// Activate specific banner
const activateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Deactivate all banners
    await Banner.updateMany({}, { isActive: false });
    
    // Activate the specified banner
    const banner = await Banner.findByIdAndUpdate(
      id,
      { isActive: true, updatedAt: new Date() },
      { new: true }
    );
    
    if (!banner) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    
    res.json({
      message: 'Banner activated successfully',
      banner
    });
  } catch (error) {
    console.error('Error activating banner:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid banner ID' });
    }
    res.status(500).json({ error: 'Failed to activate banner' });
  }
};

module.exports = {
  getCurrentBanner,
  updateBanner,
  getAllBanners,
  deleteBanner,
  activateBanner
};