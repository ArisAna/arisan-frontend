#!/bin/bash
# Plesk Git Deployment Script
# This script runs after git pull to build and deploy the site

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the Next.js app
echo "🔨 Building Next.js app..."
npm run build

# Copy built files to httpdocs
echo "📂 Deploying to httpdocs..."
cp -r out/* /var/www/vhosts/arisan.gr/arisangr/httpdocs/

echo "✅ Deployment complete!"
