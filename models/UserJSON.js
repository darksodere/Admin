 const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

class UserJSON {
  constructor() {
    this.filePath = path.join(__dirname, '../data/users.json');
    this.ensureDataFile();
  }

  ensureDataFile() {
    const dataDir = path.dirname(this.filePath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([], null, 2));
    }
  }

  readData() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users data:', error);
      return [];
    }
  }

  writeData(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users data:', error);
      return false;
    }
  }

  generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  findAll() {
    return this.readData();
  }

  findById(id) {
    const users = this.readData();
    return users.find(user => user._id === id);
  }

  findOne(query) {
    const users = this.readData();
    return users.find(user => {
      return Object.keys(query).every(key => user[key] === query[key]);
    });
  }

  findByEmail(email) {
    return this.findOne({ email: email.toLowerCase() });
  }

  findByUsername(username) {
    return this.findOne({ username });
  }

  async create(userData) {
    try {
      const users = this.readData();
      
      // Check if user already exists
      const existingUser = users.find(user => 
        user.email === userData.email.toLowerCase() || 
        user.username === userData.username
      );
      
      if (existingUser) {
        throw new Error('User with this email or username already exists');
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      const newUser = {
        _id: this.generateId(),
        username: userData.username,
        email: userData.email.toLowerCase(),
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        avatar: userData.avatar || '',
        role: userData.role || 'user',
        isVerified: userData.isVerified || false,
        preferences: {
          favoriteGenres: userData.preferences?.favoriteGenres || [],
          notifications: {
            email: userData.preferences?.notifications?.email !== false,
            push: userData.preferences?.notifications?.push !== false
          }
        },
        address: userData.address || {},
        phone: userData.phone || '',
        dateOfBirth: userData.dateOfBirth || null,
        lastLogin: null,
        isActive: userData.isActive !== false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      users.push(newUser);
      
      if (this.writeData(users)) {
        // Return user without password
        const { password, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
      } else {
        throw new Error('Failed to save user data');
      }
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, updateData) {
    try {
      const users = this.readData();
      const userIndex = users.findIndex(user => user._id === id);
      
      if (userIndex === -1) {
        return null;
      }

      // If password is being updated, hash it
      if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
      }

      // Update user
      users[userIndex] = {
        ...users[userIndex],
        ...updateData,
        updatedAt: new Date().toISOString()
      };

      if (this.writeData(users)) {
        const { password, ...userWithoutPassword } = users[userIndex];
        return userWithoutPassword;
      } else {
        throw new Error('Failed to update user data');
      }
    } catch (error) {
      throw error;
    }
  }

  deleteById(id) {
    try {
      const users = this.readData();
      const filteredUsers = users.filter(user => user._id !== id);
      
      if (filteredUsers.length === users.length) {
        return false; // User not found
      }

      return this.writeData(filteredUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
      return false;
    }
  }

  async comparePassword(user, candidatePassword) {
    return await bcrypt.compare(candidatePassword, user.password);
  }

  updateLastLogin(id) {
    try {
      const users = this.readData();
      const userIndex = users.findIndex(user => user._id === id);
      
      if (userIndex !== -1) {
        users[userIndex].lastLogin = new Date().toISOString();
        users[userIndex].updatedAt = new Date().toISOString();
        this.writeData(users);
      }
    } catch (error) {
      console.error('Error updating last login:', error);
    }
  }
}

module.exports = new UserJSON();