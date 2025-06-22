# 👤 Admin Account Creation Instructions

## 🎯 Admin Credentials
- **Username**: `01944281278`
- **Password**: `fahim007`
- **Role**: `admin`

## 🚀 How to Create Admin Account

### Step 1: Install Dependencies
```bash
cd c:\Users\W.C\Documents\otakughor\server
npm install
```

### Step 2: Create Admin Account
```bash
npm run create-admin
```

**OR**

```bash
node scripts/createAdmin.js
```

### Step 3: Verify Creation
You should see this output:
```
✅ Admin created successfully!
Username: 01944281278
Password: fahim007
Role: admin
```

## 🔐 Login to Admin Panel

### Access Admin Panel
1. **Start your server**: `npm start`
2. **Open browser**: `http://localhost:3000/admin/login`
3. **Enter credentials**:
   - Username: `01944281278`
   - Password: `fahim007`
4. **Click Login**

### Admin Panel Features
After login, you'll have access to:
- 📊 **Dashboard**: Overview of your store
- 📦 **Products**: Manage your anime/manga products
- 🛒 **Orders**: View and manage customer orders
- 📈 **Analytics**: Sales and performance insights
- 🖼️ **Banner**: Change homepage banner
- ⭐ **Featured Cards**: Manage featured products

## 🛠️ Troubleshooting

### ❌ "Admin already exists"
If you see this message, the admin account is already created. You can:
1. Try logging in with the credentials
2. Or delete the existing admin and recreate

### ❌ "Cannot connect to database"
Make sure:
1. Your MongoDB connection string is correct in `.env`
2. Your internet connection is working
3. MongoDB Atlas (if using cloud) is accessible

### ❌ "bcryptjs not found" or "jsonwebtoken not found"
Run:
```bash
npm install bcryptjs jsonwebtoken
```

### ❌ "Invalid credentials" when logging in
1. Make sure you created the admin account first
2. Check that you're using the correct username and password
3. Verify the server is running

## 🔄 Reset Admin Password

If you need to change the password later:

1. **Edit the createAdmin.js script**:
   ```javascript
   const username = '01944281278';
   const password = 'your-new-password'; // Change this
   ```

2. **Delete existing admin** (optional):
   - Go to MongoDB and delete the admin document
   - Or modify the script to update instead of create

3. **Run the script again**:
   ```bash
   npm run create-admin
   ```

## 📱 Mobile Access

The admin panel is responsive and works on mobile devices:
- **Phone**: Access from your mobile browser
- **Tablet**: Full functionality available
- **Desktop**: Best experience with full features

## 🔐 Security Notes

### Keep Credentials Safe
- Don't share admin credentials
- Use strong passwords in production
- Consider changing default password

### Production Security
For production deployment:
1. Change the default password
2. Use environment variables for credentials
3. Enable HTTPS
4. Set up proper firewall rules
5. Regular security updates

## 🎯 What You Can Do After Login

### Immediate Actions
1. **Upload Products**: Add your anime/manga products
2. **Set Banner**: Change the homepage banner image
3. **Configure Featured Cards**: Set up featured products
4. **Check Analytics**: View your store performance

### Daily Management
- **Process Orders**: Update order status and manage deliveries
- **Monitor Analytics**: Track sales and customer behavior
- **Update Inventory**: Add new products and manage stock
- **Customer Service**: Handle order inquiries and issues

## 📞 Support

If you encounter any issues:
1. **Check server logs**: Look for error messages
2. **Verify database connection**: Ensure MongoDB is accessible
3. **Check browser console**: Look for JavaScript errors
4. **Try different browser**: Sometimes browser cache causes issues

---

**🎌 Your OtakuGhor admin account is ready!**

*You now have full control over your anime empire!* 👑✨