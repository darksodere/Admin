const express = require('express');
const router = express.Router();
const upload = require('../utils/multerUpload');

// Single image upload
router.post('/image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No image file provided'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: req.file.path,
      publicId: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Image upload failed',
      error: error.message
    });
  }
});

// Delete image from Cloudinary
router.delete('/image/:publicId', async (req, res) => {
  try {
    const { publicId } = req.params;
    const cloudinary = require('../utils/cloudinary');
    
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      res.status(200).json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Failed to delete image'
      });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({
      success: false,
      message: 'Image deletion failed',
      error: error.message
    });
  }
});

module.exports = router;