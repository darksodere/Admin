# 🌟 Otaku Ghor - Anime Store

A beautiful, full-stack anime-themed e-commerce application built with React and Express.js.

![Anime Store](https://img.shields.io/badge/Anime-Store-purple?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

## ✨ Features

- 🎌 **Anime-themed UI** with beautiful gradients and animations
- 📦 **Product Management** with categories, search, and filtering
- 🔔 **Dynamic Notifications** system with real-time updates
- 👤 **Admin Dashboard** with analytics and inventory management
- 🛒 **Shopping Cart** with persistent storage
- 📱 **Responsive Design** that works on all devices
- 🗄️ **JSON Database** - no MongoDB required!
- 🎨 **Tailwind CSS** for beautiful styling
- 🔐 **JWT Authentication** for secure admin access

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd otaku-ghor
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5002

### Production Deployment

1. **Prepare for deployment**
   ```bash
   node deploy.js
   ```

2. **Deploy to Render**
   - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions

## 📁 Project Structure

```
otaku-ghor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React contexts
│   │   └── config/        # Configuration files
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── models/           # Data models
│   ├── data/             # JSON database
│   └── package.json
└── package.json          # Root package.json
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Context** - State management

### Backend
- **Express.js** - Web framework for Node.js
- **JSON Database** - File-based database (no MongoDB needed)
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Image upload and management
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🎯 API Endpoints

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Notifications
- `GET /api/notifications` - Get notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read

### Admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `GET /api/products/admin/stats` - Get statistics

## 🔧 Environment Variables

### Server (.env)
```env
PORT=5002
NODE_ENV=development
DATABASE_TYPE=json
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
CLOUD_NAME=your-cloudinary-name
CLOUD_API_KEY=your-cloudinary-key
CLOUD_API_SECRET=your-cloudinary-secret
```

## 🎨 Features Showcase

### 🌸 Anime-themed Design
- Beautiful gradients and animations
- Floating anime elements (cherry blossoms, stars, etc.)
- Kawaii hover effects and micro-interactions
- Japanese-inspired typography

### 📊 Admin Dashboard
- Real-time statistics and analytics
- Product inventory management
- Dynamic notification system
- User-friendly interface

### 🛒 Shopping Experience
- Intuitive product browsing
- Advanced search and filtering
- Responsive shopping cart
- Smooth checkout process

## 🚀 Deployment

This application is optimized for deployment on:
- **Render** (recommended) - See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Heroku**
- **Vercel** (frontend only)
- **Railway**
- **DigitalOcean App Platform**

## 📝 Scripts

```bash
# Development
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend
npm run server       # Start only backend

# Production
npm run build        # Build React app
npm start           # Start production server
npm run deploy      # Prepare for deployment

# Setup
npm run install-all  # Install all dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the amazing anime community
- Built with love for otaku worldwide
- Special thanks to all anime creators and artists

---

Made with ❤️ for the Otaku Community 🌸

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)