#!/bin/bash
# Plesk Git Deployment Script
# Copies pre-built files from out/ to httpdocs/
# Build is done locally before git push

set -e

echo "Starting deployment..."

# Copy built files to httpdocs
echo "Deploying to httpdocs..."
cp -r out/* httpdocs/

echo "Deployment complete!"
