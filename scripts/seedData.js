const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Product = require('../models/Product');
const Banner = require('../models/Banner');
const FeaturedCard = require('../models/FeaturedCard');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err.message);
    process.exit(1);
  }
};

// Sample products data
const sampleProducts = [
  {
    name: 'Naruto Uzumaki Figure',
    description: 'High-quality Naruto Uzumaki figure with detailed craftsmanship and authentic design',
    category: 'Figures',
    image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=Naruto+Figure',
    volume: 1,
    price: 2899,
    stock: 15,
    printType: 'Yellow',
    available: true
  },
  {
    name: 'Attack on Titan Volume 1',
    description: 'The beginning of the epic Attack on Titan manga series',
    category: 'Manga',
    image: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=AOT+Vol+1',
    volume: 1,
    price: 450,
    stock: 25,
    printType: 'Yellow',
    available: true
  },
  {
    name: 'Attack on Titan Volume 2',
    description: 'Continue the thrilling story of humanity vs titans',
    category: 'Manga',
    image: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=AOT+Vol+2',
    volume: 2,
    price: 450,
    stock: 20,
    printType: 'Yellow',
    available: true
  },
  {
    name: 'Demon Slayer Complete Box Set',
    description: 'Complete Demon Slayer manga collection in a beautiful box set',
    category: 'Manga',
    image: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=DS+Box+Set',
    volume: 0,
    price: 8500,
    stock: 5,
    printType: 'White',
    available: true
  },
  {
    name: 'One Piece Luffy Figure',
    description: 'Dynamic Monkey D. Luffy action figure in Gear 4 pose',
    category: 'Figures',
    image: 'https://via.placeholder.com/300x400/10b981/ffffff?text=Luffy+Figure',
    volume: 1,
    price: 3200,
    stock: 8,
    available: true
  },
  {
    name: 'My Hero Academia Poster Set',
    description: 'Set of 3 high-quality My Hero Academia character posters',
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x400/8b5cf6/ffffff?text=MHA+Posters',
    price: 850,
    stock: 30,
    available: true
  },
  {
    name: 'Studio Ghibli Art Book',
    description: 'Beautiful collection of Studio Ghibli artwork and behind-the-scenes content',
    category: 'Art Books',
    image: 'https://via.placeholder.com/300x400/f59e0b/ffffff?text=Ghibli+Art',
    price: 3500,
    stock: 12,
    printType: 'White',
    available: true
  },
  {
    name: 'Akira Vintage T-Shirt',
    description: 'Retro-style Akira movie t-shirt with iconic motorcycle scene',
    category: 'Clothing',
    image: 'https://via.placeholder.com/300x400/dc2626/ffffff?text=Akira+Shirt',
    price: 1200,
    stock: 0,
    available: false
  },
  {
    name: 'Dragon Ball Z Keychain Set',
    description: 'Set of 7 Dragon Ball keychains featuring all the dragon balls',
    category: 'Accessories',
    image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=DBZ+Keys',
    price: 650,
    stock: 45,
    available: true
  },
  {
    name: 'Spirited Away Light Novel',
    description: 'Official light novel adaptation of the beloved Studio Ghibli film',
    category: 'Light Novel',
    image: 'https://via.placeholder.com/300x400/06b6d4/ffffff?text=Spirited+Away',
    price: 750,
    stock: 18,
    printType: 'White',
    available: true
  }
];

// Sample banner data
const sampleBanner = {
  image: 'https://via.placeholder.com/1200x400/f97316/ffffff?text=Welcome+to+Otaku+Ghor+-+Your+Anime+Paradise',
  title: 'Welcome to Otaku Ghor',
  subtitle: 'Your Ultimate Anime & Manga Destination',
  buttonText: 'Shop Now',
  buttonLink: '/products',
  overlayOpacity: 0.4,
  isActive: true
};

// Sample featured cards data
const sampleFeaturedCards = [
  {
    slot: 1,
    title: 'Haikyuu!!',
    description: 'Complete volleyball manga series with amazing character development and inspiring sports action',
    image: 'https://via.placeholder.com/300x400/f97316/ffffff?text=Haikyuu',
    isActive: true
  },
  {
    slot: 2,
    title: 'Attack on Titan',
    description: 'Epic story of humanity\'s fight against titans in this dark and thrilling manga series',
    image: 'https://via.placeholder.com/300x400/3b82f6/ffffff?text=AOT',
    isActive: true
  },
  {
    slot: 3,
    title: 'Demon Slayer',
    description: 'Beautiful art and compelling demon hunting adventure that captivated millions worldwide',
    image: 'https://via.placeholder.com/300x400/ef4444/ffffff?text=DS',
    isActive: true
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Product.deleteMany({});
    await Banner.deleteMany({});
    await FeaturedCard.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    // Seed products
    const products = await Product.insertMany(sampleProducts);
    console.log(`📦 Seeded ${products.length} products`);
    
    // Seed banner
    const banner = await Banner.create(sampleBanner);
    console.log('🖼️ Seeded banner');
    
    // Seed featured cards
    const featuredCards = await FeaturedCard.insertMany(sampleFeaturedCards);
    console.log(`⭐ Seeded ${featuredCards.length} featured cards`);
    
    console.log('✅ Database seeding completed successfully!');
    
    // Display summary
    console.log('\n📊 Seeding Summary:');
    console.log(`Products: ${products.length}`);
    console.log(`Banner: 1`);
    console.log(`Featured Cards: ${featuredCards.length}`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  connectDB().then(() => {
    seedDatabase();
  });
}

module.exports = { seedDatabase, sampleProducts, sampleBanner, sampleFeaturedCards };