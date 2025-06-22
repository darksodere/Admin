/**
 * Enhanced Google Apps Script for OtakuGhor Order Management
 * 
 * Instructions:
 * 1. Create a new Google Sheet named "OtakuGhor_Orders"
 * 2. Set headers in row 1: Name | Phone | Address | Payment Method | Items | Total | Tracking Number | Order Status | Payment Status | Notes | Time
 * 3. Go to Extensions > Apps Script
 * 4. Replace default code with this script
 * 5. Deploy as Web App with access set to "Anyone"
 * 6. Copy the deployment URL to your backend environment variables
 */

function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    
    // If Sheet1 doesn't exist, create it
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Sheet1");
      // Add headers
      sheet.getRange(1, 1, 1, 11).setValues([[
        "Name", "Phone", "Address", "Payment Method", "Items", 
        "Total", "Tracking Number", "Order Status", "Payment Status", "Notes", "Time"
      ]]);
      
      // Format headers
      var headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#4285f4");
      headerRange.setFontColor("white");
    }
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Security check (optional)
    var expectedSecret = "otaku-ghor-2024"; // Change this to match your backend
    if (data.secret && data.secret !== expectedSecret) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: "Error", message: "Invalid secret key" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle different actions
    if (data.action === "update") {
      return handleStatusUpdate(sheet, data);
    } else {
      return handleNewOrder(sheet, data);
    }
    
  } catch (error) {
    console.error("Error processing request:", error);
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "Error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleNewOrder(sheet, data) {
  try {
    // Format items array into a readable string
    var itemsText = "";
    if (Array.isArray(data.items)) {
      itemsText = data.items.join(", ");
    } else if (typeof data.items === 'string') {
      itemsText = data.items;
    }
    
    // Prepare row data
    var rowData = [
      data.name || "",
      data.phone || "",
      data.address || "",
      data.paymentMethod || "",
      itemsText,
      data.total || "",
      data.trackingNumber || "",
      data.orderStatus || "pending",
      data.paymentStatus || "pending",
      data.notes || "",
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    ];
    
    // Add the new order to the sheet
    sheet.appendRow(rowData);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 11);
    
    // Log the successful addition
    console.log("New order added:", data.trackingNumber || "No tracking number");
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "Success", 
        message: "Order added successfully",
        trackingNumber: data.trackingNumber
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error adding new order:", error);
    throw error;
  }
}

function handleStatusUpdate(sheet, data) {
  try {
    var trackingNumber = data.trackingNumber;
    if (!trackingNumber) {
      throw new Error("Tracking number is required for status updates");
    }
    
    // Find the row with the matching tracking number
    var dataRange = sheet.getDataRange();
    var values = dataRange.getValues();
    var trackingColumnIndex = 6; // Column G (0-indexed)
    var orderStatusColumnIndex = 7; // Column H (0-indexed)
    var paymentStatusColumnIndex = 8; // Column I (0-indexed)
    
    var rowFound = false;
    for (var i = 1; i < values.length; i++) { // Start from 1 to skip header
      if (values[i][trackingColumnIndex] === trackingNumber) {
        // Update the status columns
        if (data.orderStatus) {
          sheet.getRange(i + 1, orderStatusColumnIndex + 1).setValue(data.orderStatus);
        }
        if (data.paymentStatus) {
          sheet.getRange(i + 1, paymentStatusColumnIndex + 1).setValue(data.paymentStatus);
        }
        
        // Update the timestamp
        sheet.getRange(i + 1, 11).setValue(new Date().toLocaleString("en-US", {
          timeZone: "Asia/Dhaka",
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + " (Updated)");
        
        rowFound = true;
        break;
      }
    }
    
    if (!rowFound) {
      throw new Error("Order with tracking number " + trackingNumber + " not found");
    }
    
    console.log("Order status updated:", trackingNumber);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "Success", 
        message: "Order status updated successfully",
        trackingNumber: trackingNumber
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Test function to verify the script works
function testScript() {
  var testData = {
    name: "Test Customer",
    phone: "01712345678",
    address: "Test Address, Dhaka",
    paymentMethod: "bkash",
    items: ["Test Product (1x Regular)"],
    total: "৳500",
    trackingNumber: "TEST123",
    orderStatus: "pending",
    paymentStatus: "pending",
    notes: "Test order",
    secret: "otaku-ghor-2024"
  };
  
  var mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  var result = doPost(mockEvent);
  console.log("Test result:", result.getContent());
}