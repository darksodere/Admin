# Otaku Ghor Server

Backend API for the Otaku Ghor anime store built with Express.js and MongoDB.

## 🚀 Features

- **MongoDB Integration** with Mongoose ODM
- **RESTful API** for products, banners, and featured cards
- **Data Validation** with Mongoose schemas
- **Error Handling** with detailed error messages
- **CORS Support** for cross-origin requests
- **Environment Configuration** with dotenv
- **Data Seeding** for initial setup

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   
   Update the `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/otaku_ghor?retryWrites=true&w=majority
   ```

3. **Seed Database** (Optional)
   ```bash
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Schemas

### Product Schema
```javascript
{
  name: String (required),
  description: String,
  category: String (required, enum),
  image: String (required),
  volume: Number,
  price: Number (required),
  stock: Number (required, default: 0),
  printType: String (enum: 'Yellow', 'White'),
  available: Boolean (default: true),
  createdAt: Date (default: now)
}
```

### Banner Schema
```javascript
{
  image: String (required),
  title: String (default: 'Welcome to Otaku Ghor'),
  subtitle: String,
  buttonText: String (default: 'Shop Now'),
  buttonLink: String (default: '/products'),
  overlayOpacity: Number (0-1, default: 0.4),
  isActive: Boolean (default: true),
  updatedAt: Date (default: now)
}
```

### Featured Card Schema
```javascript
{
  title: String (required),
  description: String,
  image: String (required),
  slot: Number (required, 1-3, unique),
  isActive: Boolean (default: true),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## 🛣️ API Routes

### Products
- `GET /api/products` - Get all products (with filtering, search, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/search` - Search products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/admin/stats` - Get admin statistics

### Banner
- `GET /api/banner/current` - Get current active banner
- `GET /api/banner` - Get all banners (admin)
- `POST /api/banner` - Create/update banner
- `DELETE /api/banner/:id` - Delete banner
- `PATCH /api/banner/:id/activate` - Activate specific banner

### Featured Cards
- `GET /api/featured-cards` - Get all featured cards
- `GET /api/featured-cards/slot/:slot` - Get card by slot (1-3)
- `POST /api/featured-cards` - Create featured card
- `PUT /api/featured-cards/slot/:slot` - Update card by slot
- `PATCH /api/featured-cards/slot/:slot/toggle` - Toggle card active status
- `DELETE /api/featured-cards/slot/:slot` - Delete card by slot
- `POST /api/featured-cards/reset` - Reset to default cards

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🌐 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/otaku_ghor?retryWrites=true&w=majority
```

## 📁 Project Structure

```
server/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── productController.js
│   ├── bannerController.js
│   └── featuredCardController.js
├── models/
│   ├── Product.js
│   ├── Banner.js
��   └── FeaturedCard.js
├── routes/
│   ├── productRoutes.js
│   ├── bannerRoutes.js
│   └── featuredCardRoutes.js
├── scripts/
│   └── seedData.js        # Database seeding
├── .env                   # Environment variables
├── server.js              # Main server file
└── package.json
```

## 🚦 Getting Started

1. **Setup MongoDB Atlas** (or local MongoDB)
2. **Update .env** with your MongoDB connection string
3. **Install dependencies**: `npm install`
4. **Seed database**: `npm run seed`
5. **Start server**: `npm run dev`
6. **Test API**: Visit `http://localhost:5000/api/health`

## 🔒 Security Notes

- In production, add authentication middleware for admin routes
- Use environment variables for sensitive data
- Implement rate limiting for API endpoints
- Add input sanitization and validation
- Use HTTPS in production

## 📊 Sample Data

The seeding script includes:
- **10 sample products** across different categories
- **1 default banner** with customizable settings
- **3 featured cards** for the homepage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details