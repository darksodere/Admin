const jsonDB = require('../utils/jsonDB');

class OrderJSON {
  static find(filter = {}) {
    return jsonDB.find('orders', filter);
  }

  static findOne(filter) {
    return jsonDB.findOne('orders', filter);
  }

  static findById(id) {
    return jsonDB.findById('orders', id);
  }

  static create(data) {
    // Generate tracking number if not provided
    if (!data.trackingNumber) {
      data.trackingNumber = 'OG' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();
    }
    
    // Calculate final total
    data.finalTotal = data.total + (data.shippingCost || 0) - (data.discount || 0);
    
    return jsonDB.insertOne('orders', data);
  }

  static updateById(id, update) {
    return jsonDB.updateById('orders', id, update);
  }

  static deleteById(id) {
    return jsonDB.deleteById('orders', id);
  }

  static countDocuments(filter = {}) {
    return jsonDB.count('orders', filter);
  }

  static aggregate(pipeline) {
    return jsonDB.aggregate('orders', pipeline);
  }

  // Helper method to save (for compatibility)
  save() {
    if (this._id) {
      return OrderJSON.updateById(this._id, this);
    } else {
      return OrderJSON.create(this);
    }
  }
}

module.exports = OrderJSON;