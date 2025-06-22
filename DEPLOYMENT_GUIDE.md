# 🚀 Otaku Ghor - Render Deployment Guide

This guide will help you deploy the Otaku Ghor anime store application to Render.

## 📋 Prerequisites

- GitHub account
- Render account (free tier available)
- Node.js 16+ installed locally

## 🔧 Deployment Options

### Option 1: Single Service Deployment (Recommended)

Deploy both frontend and backend as a single service on Render.

#### Steps:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Create New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `otaku-ghor` repository

3. **Configure Service Settings**
   ```
   Name: otaku-ghor
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_TYPE=json
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-here
   CLOUD_NAME=dighwjhdz
   CLOUD_API_KEY=817644997542614
   CLOUD_API_SECRET=Hf8EhIXPRtrehiJXoNOmyH0EX3I
   GOOGLE_SHEETS_URL=https://script.google.com/macros/s/AKfycbyCXBqqdqaNp3vMKuKAHkhvRubvbkFU_Ik6w-ESPJAhPlaxkmATlKAmk8VjE_qY09M/exec
   GOOGLE_SHEETS_SECRET=otaku-ghor-2024
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete (5-10 minutes)

### Option 2: Separate Services (Advanced)

Deploy frontend and backend as separate services.

#### Backend Service:
```
Name: otaku-ghor-api
Environment: Node
Root Directory: server
Build Command: npm install
Start Command: npm start
```

#### Frontend Service:
```
Name: otaku-ghor-frontend
Environment: Static Site
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: build
```

## 🌐 Environment Variables

### Required Variables:
- `NODE_ENV`: Set to `production`
- `PORT`: Render will set this automatically
- `JWT_SECRET`: Generate a secure random string
- `JWT_REFRESH_SECRET`: Generate another secure random string

### Optional Variables:
- `CLOUD_NAME`: For Cloudinary image uploads
- `CLOUD_API_KEY`: Cloudinary API key
- `CLOUD_API_SECRET`: Cloudinary API secret
- `GOOGLE_SHEETS_URL`: For Google Sheets integration

## 📁 File Structure for Deployment

```
otaku-ghor/
├── client/                 # React frontend
│   ├── build/             # Built files (generated)
│   ├── src/
│   └── package.json
├── server/                # Express backend
│   ├── data/             # JSON database files
│   ├── controllers/
│   ├── routes/
│   └── package.json
├── package.json          # Root package.json
├── render.yaml           # Render configuration
└── build.sh             # Build script
```

## 🔍 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check Node.js version (should be 16+)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **API Not Working**
   - Verify environment variables are set
   - Check CORS configuration
   - Ensure API routes are properly configured

3. **Database Issues**
   - JSON files are created automatically
   - Check data directory permissions
   - Verify file paths are correct

### Debug Commands:
```bash
# Test build locally
npm run build

# Test server locally
cd server && npm start

# Check health endpoint
curl https://your-app.onrender.com/api/health
```

## 🎯 Post-Deployment Steps

1. **Test the Application**
   - Visit your Render URL
   - Test all major features
   - Check admin panel functionality

2. **Create Admin User**
   - Use the admin creation script
   - Or create manually through the API

3. **Upload Sample Data**
   - Add some products
   - Test notifications
   - Verify all features work

## 📊 Monitoring

- **Render Dashboard**: Monitor deployment status and logs
- **Health Check**: `https://your-app.onrender.com/api/health`
- **Logs**: Available in Render dashboard

## 🔒 Security Notes

- All sensitive data is stored in environment variables
- JWT secrets are generated securely
- CORS is configured for production
- Helmet.js provides security headers

## 💡 Tips for Success

1. **Free Tier Limitations**
   - Services sleep after 15 minutes of inactivity
   - First request after sleep may be slow
   - Consider upgrading for production use

2. **Performance**
   - JSON database is suitable for small to medium datasets
   - Consider MongoDB for larger applications
   - Enable gzip compression for better performance

3. **Maintenance**
   - Regular backups of JSON data files
   - Monitor application logs
   - Keep dependencies updated

## 🆘 Support

If you encounter issues:
1. Check Render logs first
2. Verify environment variables
3. Test locally with production settings
4. Check GitHub repository for updates

## 🎉 Success!

Once deployed, your Otaku Ghor anime store will be live at:
`https://your-app-name.onrender.com`

Features available:
- ✅ Full anime-themed UI
- ✅ Product management
- ✅ Dynamic notifications
- ✅ Admin dashboard
- ✅ Shopping cart
- ✅ Responsive design
- ✅ JSON database (no MongoDB required)

Happy deploying! 🌟