#!/bin/bash
# Plesk Git Deployment Script
# This script runs after git pull to build and deploy the site

set -e  # Exit on error

echo "Starting deployment..."

# Add Node.js to PATH (Plesk installs Node.js here)
export PATH="/opt/plesk/node/24/bin:$PATH"

# Limit Node.js memory to avoid EAGAIN errors on shared hosting
export NODE_OPTIONS="--max-old-space-size=512"

# Set environment variables for build
export NEXT_PUBLIC_RAILWAY_API_URL="https://api.arisan.gr/api"

# Install dependencies (skip if node_modules exists and is up to date)
echo "Installing dependencies..."
npm install --prefer-offline

# Build the Next.js app
echo "Building Next.js app..."
npm run build

# Copy built files to httpdocs
echo "Deploying to httpdocs..."
cp -r out/* httpdocs/

echo "Deployment complete!"
