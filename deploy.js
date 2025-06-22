#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Otaku Ghor Deployment Script');
console.log('================================');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Error: package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if client and server directories exist
if (!fs.existsSync('client') || !fs.existsSync('server')) {
  console.error('❌ Error: client or server directory not found.');
  process.exit(1);
}

try {
  console.log('📦 Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('🔧 Installing server dependencies...');
  execSync('cd server && npm install', { stdio: 'inherit' });

  console.log('🎨 Installing client dependencies...');
  execSync('cd client && npm install', { stdio: 'inherit' });

  console.log('🏗️ Building React application...');
  execSync('cd client && npm run build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
  console.log('');
  console.log('🌟 Your Otaku Ghor application is ready for deployment!');
  console.log('');
  console.log('Next steps:');
  console.log('1. Push your code to GitHub');
  console.log('2. Create a new Web Service on Render');
  console.log('3. Connect your GitHub repository');
  console.log('4. Set the build command to: npm run build');
  console.log('5. Set the start command to: npm start');
  console.log('6. Add the required environment variables');
  console.log('');
  console.log('📖 See DEPLOYMENT_GUIDE.md for detailed instructions');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}