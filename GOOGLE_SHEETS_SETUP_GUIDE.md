# 📊 Google Sheets Integration Setup Guide

## 🎯 Overview
This guide will help you set up automatic order logging to Google Sheets for your OtakuGhor store. Every order placed will be automatically recorded in a Google Sheet with real-time updates.

## 📋 What You'll Get
- **Automatic Order Logging**: Every new order automatically appears in Google Sheets
- **Real-time Status Updates**: Order and payment status changes sync automatically
- **Comprehensive Data**: Customer info, items, totals, tracking numbers, timestamps
- **Easy Access**: View and manage orders from anywhere with Google Sheets
- **Backup System**: Google Sheets serves as a backup for your order data

---

## 🚀 Step 1: Create Google Sheet

### 1.1 Create New Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Rename it to: **`OtakuGhor_Orders`**

### 1.2 Set Up Headers
In **row 1**, add these headers (copy and paste):

```
Name | Phone | Address | Payment Method | Items | Total | Tracking Number | Order Status | Payment Status | Notes | Time
```

### 1.3 Format Headers (Optional)
- Select row 1
- Make it **bold**
- Add background color (blue recommended)
- Set text color to white

---

## ⚙️ Step 2: Apps Script Setup

### 2.1 Open Apps Script
1. In your Google Sheet, click **Extensions > Apps Script**
2. You'll see a new tab with the Apps Script editor

### 2.2 Replace Default Code
1. Delete all existing code in the editor
2. Copy the entire content from `GOOGLE_APPS_SCRIPT.js` file
3. Paste it into the Apps Script editor
4. Click **Save** (Ctrl+S)

### 2.3 Deploy as Web App
1. Click **Deploy > New Deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the settings:
   - **Description**: "OtakuGhor Order Webhook"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
5. Click **Deploy**
6. **Copy the Web app URL** - you'll need this for the backend!

### 2.4 Authorize Permissions
- Google will ask for permissions
- Click **Review permissions**
- Choose your Google account
- Click **Advanced** if you see a warning
- Click **Go to [Your Project Name] (unsafe)**
- Click **Allow**

---

## 🔧 Step 3: Backend Integration

### 3.1 Install Dependencies
The backend already includes axios in package.json, but if you need to install it:

```bash
cd server
npm install axios
```

### 3.2 Environment Variables
Add these to your `.env` file:

```env
# Google Sheets Integration
GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_SHEETS_SECRET=otaku-ghor-2024
```

**Replace `YOUR_DEPLOYMENT_ID`** with the actual ID from your deployment URL.

### 3.3 Backend Files Updated
The following files have been updated with Google Sheets integration:

- ✅ **`server/utils/googleSheets.js`** - Google Sheets utility functions
- ✅ **`server/routes/orderRoutes.js`** - Order routes with sync functionality
- ✅ **`server/package.json`** - Added axios dependency

---

## 🧪 Step 4: Testing the Integration

### 4.1 Test Apps Script
1. In Apps Script editor, click **Run > testScript**
2. Check your Google Sheet - you should see a test order
3. If successful, delete the test row

### 4.2 Test Backend Integration
1. Restart your server: `npm start`
2. Place a test order through your website
3. Check Google Sheets - the order should appear automatically
4. Update order status in admin panel - status should sync to sheets

### 4.3 Verify Data Flow
Check that these fields are populated correctly:
- ✅ Customer name, phone, address
- ✅ Payment method (COD, bKash, Nagad, Rocket)
- ✅ Items list with quantities and print types
- ✅ Total amount with currency
- ✅ Tracking number
- ✅ Order and payment status
- ✅ Timestamp in Bangladesh time

---

## 📊 Step 5: Understanding the Data

### Order Data Structure
Each row in your sheet represents one order with:

| Column | Description | Example |
|--------|-------------|---------|
| Name | Customer name | "Rafsan Ahmed" |
| Phone | Phone number | "01712345678" |
| Address | Delivery address | "Savar, Dhaka" |
| Payment Method | Payment type | "bkash" |
| Items | Products ordered | "Naruto (1x White), One Piece (2x Yellow)" |
| Total | Order total | "৳510" |
| Tracking Number | Order ID | "OG1703123456ABCD" |
| Order Status | Current status | "pending", "processing", "shipped", "delivered" |
| Payment Status | Payment status | "pending", "paid", "failed" |
| Notes | Customer notes | "Please deliver after 6 PM" |
| Time | Order timestamp | "12/20/2024, 8:12:34 PM" |

### Status Updates
When you update order status in the admin panel:
- ✅ Google Sheets automatically updates
- ✅ Timestamp shows "(Updated)" 
- ✅ Both order and payment status sync

---

## 🔐 Step 6: Security Considerations

### 6.1 Secret Key Protection
- The system uses a secret key to prevent unauthorized access
- Change `GOOGLE_SHEETS_SECRET` in your `.env` file
- Update the secret in the Apps Script code accordingly

### 6.2 Access Control
- Only your server can write to the sheet
- Google Sheets is viewable by anyone with the link
- Consider making the sheet private if needed

### 6.3 Error Handling
- If Google Sheets is down, orders still save to database
- Sync failures are logged but don't affect order processing
- Non-blocking integration ensures site reliability

---

## 🛠️ Step 7: Customization Options

### 7.1 Add More Columns
To track additional data, modify:
1. Google Sheet headers
2. Apps Script `rowData` array
3. Backend `syncOrderToGoogleSheets` function

### 7.2 Change Time Zone
In Apps Script, modify the timezone:
```javascript
timeZone: "Asia/Dhaka"  // Change to your timezone
```

### 7.3 Formatting Enhancements
- Add conditional formatting for order status
- Use data validation for status columns
- Create charts and pivot tables for analytics

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ "Script function not found"
- **Solution**: Make sure you saved the Apps Script after pasting the code

#### ❌ "Permission denied"
- **Solution**: Re-run the authorization process in Apps Script

#### ❌ "Orders not appearing in sheet"
- **Solution**: Check the deployment URL in your `.env` file

#### ❌ "Status updates not syncing"
- **Solution**: Verify the tracking number format matches

### Debug Steps
1. **Check Server Logs**: Look for Google Sheets sync messages
2. **Test Apps Script**: Use the `testScript()` function
3. **Verify URL**: Ensure the deployment URL is correct
4. **Check Permissions**: Make sure the script has sheet access

### Log Messages to Look For
- ✅ `"🟢 Order synced to Google Sheet"`
- ✅ `"📊 Syncing order to Google Sheets"`
- ❌ `"❌ Google Sheets sync failed"`

---

## 📈 Step 8: Advanced Features

### 8.1 Analytics Dashboard
Create charts in Google Sheets to track:
- Daily order volume
- Payment method preferences
- Order status distribution
- Revenue trends

### 8.2 Automated Notifications
Set up Google Sheets notifications:
- Email alerts for new orders
- Status change notifications
- Daily/weekly summaries

### 8.3 Data Export
- Export to Excel for accounting
- Generate reports for business analysis
- Backup data regularly

---

## ✅ Success Checklist

Before going live, verify:

- [ ] Google Sheet created with correct headers
- [ ] Apps Script deployed and authorized
- [ ] Environment variables configured
- [ ] Test order appears in sheet
- [ ] Status updates sync correctly
- [ ] Error handling works (test with invalid URL)
- [ ] Timestamps show correct timezone
- [ ] All order data fields populate correctly

---

## 🎉 You're All Set!

Your OtakuGhor store now automatically logs all orders to Google Sheets! 

### Benefits You Now Have:
- 📊 **Real-time Order Tracking**: See orders as they come in
- 📱 **Mobile Access**: Check orders from your phone
- 📈 **Easy Analytics**: Built-in Google Sheets charts and functions
- 🔄 **Automatic Backup**: Orders saved in both database and sheets
- 👥 **Team Access**: Share sheet with team members
- 📧 **Notifications**: Set up email alerts for new orders

### Next Steps:
1. **Monitor Performance**: Watch the integration for a few days
2. **Train Your Team**: Show staff how to use the Google Sheet
3. **Set Up Analytics**: Create charts and reports
4. **Regular Backups**: Export data periodically
5. **Scale Up**: Consider additional integrations as you grow

---

**🎌 Made with ❤️ for the Otaku Community**

*Your anime empire now has enterprise-level order management!* 📊✨