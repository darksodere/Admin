const jsonDB = require('../utils/jsonDB');

class AdminJSON {
  static findOne(filter) {
    return jsonDB.findOne('admins', filter);
  }

  static findById(id) {
    return jsonDB.findById('admins', id);
  }

  static create(data) {
    return jsonDB.insertOne('admins', data);
  }

  static updateById(id, update) {
    return jsonDB.updateById('admins', id, update);
  }

  static deleteById(id) {
    return jsonDB.deleteById('admins', id);
  }

  static find(filter = {}) {
    return jsonDB.find('admins', filter);
  }

  static countDocuments(filter = {}) {
    return jsonDB.count('admins', filter);
  }
}

module.exports = AdminJSON;