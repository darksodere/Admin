#!/bin/bash

# Build script for Render deployment

echo "🚀 Starting Otaku Ghor deployment build..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Build and install server dependencies
echo "🔧 Setting up server..."
cd server
npm install
cd ..

# Build and install client dependencies
echo "🎨 Building client..."
cd client
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo "🌟 Otaku Ghor is ready for deployment!"