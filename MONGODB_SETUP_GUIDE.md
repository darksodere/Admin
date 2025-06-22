# 🗄️ MongoDB Setup Guide

## 🎯 Current Issue
Your MongoDB connection string has placeholder values that need to be replaced with actual credentials.

## 🚀 **Quick Solution: Local MongoDB**

I've updated your `.env` file to use local MongoDB. Now you need to install MongoDB locally.

### **Option 1: Install MongoDB Community Server (Recommended)**

#### 1. Download MongoDB
- Go to: https://www.mongodb.com/try/download/community
- Select: **Windows x64**
- Download the **MSI** installer

#### 2. Install MongoDB
- Run the downloaded `.msi` file
- Choose **Complete** installation
- **Install MongoDB as a Service** (check this option)
- **Install MongoDB Compass** (optional GUI tool)

#### 3. Start MongoDB Service
MongoDB should start automatically. If not:
```cmd
net start MongoDB
```

#### 4. Test Connection
```bash
npm run create-admin
```

### **Option 2: Use MongoDB Atlas (Cloud)**

If you prefer cloud database:

#### 1. Create MongoDB Atlas Account
- Go to: https://www.mongodb.com/atlas
- Sign up for free account
- Create a new cluster (free tier)

#### 2. Get Connection String
- Click **Connect** on your cluster
- Choose **Connect your application**
- Copy the connection string
- Replace `<username>`, `<password>`, and `<cluster-url>`

#### 3. Update .env File
Replace the MONGODB_URI in your `.env` file:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/otaku_ghor?retryWrites=true&w=majority
```

### **Option 3: Use Docker (Advanced)**

If you have Docker installed:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🧪 **Test Your Setup**

### 1. Check MongoDB Connection
```bash
node scripts/checkAdmin.js
```

### 2. Create Admin Account
```bash
npm run create-admin
```

### 3. Expected Success Output
```
✅ Admin created successfully!
Username: 01944281278
Password: fahim007
Role: admin
```

## 🔧 **Troubleshooting**

### ❌ "ENOTFOUND" Error
- **Local MongoDB**: Install MongoDB Community Server
- **Atlas**: Check your connection string and credentials
- **Network**: Check internet connection for Atlas

### ❌ "Connection Refused"
- **Local**: Start MongoDB service: `net start MongoDB`
- **Atlas**: Check cluster status in Atlas dashboard

### ❌ "Authentication Failed"
- **Atlas**: Verify username/password in connection string
- **Local**: No authentication needed by default

### ❌ "Network Timeout"
- **Atlas**: Check firewall settings, whitelist your IP
- **Local**: Check if MongoDB service is running

## 📊 **Verify Everything Works**

After successful setup:

1. **Create Admin**:
   ```bash
   npm run create-admin
   ```

2. **Start Server**:
   ```bash
   npm start
   ```

3. **Login to Admin Panel**:
   - URL: `http://localhost:3000/admin/login`
   - Username: `01944281278`
   - Password: `fahim007`

## 🎯 **Recommended Next Steps**

1. **Install MongoDB locally** (easiest option)
2. **Test admin creation**
3. **Start your server**
4. **Login to admin panel**
5. **Begin managing your store**

---

**🎌 Choose the option that works best for you!**

*Local MongoDB is fastest to set up, while Atlas provides cloud backup and scalability.* 🗄️✨