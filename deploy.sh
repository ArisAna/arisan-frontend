#!/bin/bash
# Plesk Git Deployment Script
# This script runs after git pull to build and deploy the site

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Add Node.js to PATH (Plesk installs Node.js here)
export PATH="/opt/plesk/node/24/bin:$PATH"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the Next.js app
echo "🔨 Building Next.js app..."
npm run build

# Copy built files to httpdocs
echo "📂 Deploying to httpdocs..."
cp -r out/* httpdocs/

echo "✅ Deployment complete!"
