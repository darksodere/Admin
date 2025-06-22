const fs = require('fs');
const path = require('path');

class JsonDB {
  constructor() {
    this.dataDir = path.join(__dirname, '../data');
    this.ensureDataDir();
  }

  ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  getFilePath(collection) {
    return path.join(this.dataDir, `${collection}.json`);
  }

  read(collection) {
    try {
      const filePath = this.getFilePath(collection);
      if (!fs.existsSync(filePath)) {
        this.write(collection, []);
        return [];
      }
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`Error reading ${collection}:`, error);
      return [];
    }
  }

  write(collection, data) {
    try {
      const filePath = this.getFilePath(collection);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error(`Error writing ${collection}:`, error);
      return false;
    }
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  // Find all documents
  find(collection, filter = {}) {
    const data = this.read(collection);
    if (Object.keys(filter).length === 0) {
      return data;
    }
    
    return data.filter(item => {
      return Object.keys(filter).every(key => {
        if (typeof filter[key] === 'object' && filter[key].$regex) {
          const regex = new RegExp(filter[key].$regex, filter[key].$options || '');
          return regex.test(item[key]);
        }
        return item[key] === filter[key];
      });
    });
  }

  // Find one document
  findOne(collection, filter) {
    const data = this.find(collection, filter);
    return data.length > 0 ? data[0] : null;
  }

  // Find by ID
  findById(collection, id) {
    return this.findOne(collection, { _id: id });
  }

  // Insert one document
  insertOne(collection, document) {
    const data = this.read(collection);
    const newDoc = {
      _id: this.generateId(),
      ...document,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    data.push(newDoc);
    this.write(collection, data);
    return newDoc;
  }

  // Insert many documents
  insertMany(collection, documents) {
    const data = this.read(collection);
    const newDocs = documents.map(doc => ({
      _id: this.generateId(),
      ...doc,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    data.push(...newDocs);
    this.write(collection, data);
    return newDocs;
  }

  // Update one document
  updateOne(collection, filter, update) {
    const data = this.read(collection);
    const index = data.findIndex(item => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    });
    
    if (index !== -1) {
      data[index] = {
        ...data[index],
        ...update,
        updatedAt: new Date()
      };
      this.write(collection, data);
      return data[index];
    }
    return null;
  }

  // Update by ID
  updateById(collection, id, update) {
    return this.updateOne(collection, { _id: id }, update);
  }

  // Delete one document
  deleteOne(collection, filter) {
    const data = this.read(collection);
    const index = data.findIndex(item => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    });
    
    if (index !== -1) {
      const deleted = data.splice(index, 1)[0];
      this.write(collection, data);
      return deleted;
    }
    return null;
  }

  // Delete by ID
  deleteById(collection, id) {
    return this.deleteOne(collection, { _id: id });
  }

  // Count documents
  count(collection, filter = {}) {
    return this.find(collection, filter).length;
  }

  // Aggregate (basic implementation)
  aggregate(collection, pipeline) {
    let data = this.read(collection);
    
    for (const stage of pipeline) {
      if (stage.$match) {
        data = data.filter(item => {
          return Object.keys(stage.$match).every(key => {
            if (key === 'createdAt' && stage.$match[key].$gte) {
              return new Date(item.createdAt) >= new Date(stage.$match[key].$gte);
            }
            return item[key] === stage.$match[key];
          });
        });
      }
      
      if (stage.$group) {
        const grouped = {};
        data.forEach(item => {
          const groupKey = stage.$group._id || 'all';
          if (!grouped[groupKey]) {
            grouped[groupKey] = {};
            Object.keys(stage.$group).forEach(key => {
              if (key !== '_id') {
                grouped[groupKey][key] = 0;
              }
            });
          }
          
          Object.keys(stage.$group).forEach(key => {
            if (key !== '_id') {
              const operation = stage.$group[key];
              if (operation.$sum === 1) {
                grouped[groupKey][key]++;
              } else if (operation.$sum && typeof operation.$sum === 'string') {
                const field = operation.$sum.replace('$', '');
                grouped[groupKey][key] += item[field] || 0;
              } else if (operation.$avg && typeof operation.$avg === 'string') {
                const field = operation.$avg.replace('$', '');
                grouped[groupKey][key] = (grouped[groupKey][key] || 0) + (item[field] || 0);
              }
            }
          });
        });
        
        data = Object.keys(grouped).map(key => ({
          _id: key === 'all' ? null : key,
          ...grouped[key]
        }));
      }
    }
    
    return data;
  }
}

module.exports = new JsonDB();