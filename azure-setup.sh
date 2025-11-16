#!/bin/bash

# Azure Setup Script for Recipe Finder App
echo "🚀 Setting up Azure deployment for Recipe Finder..."

# Step 1: Login to Azure
echo "📝 Please login to Azure..."
az login

# Step 2: Create Resource Group
echo "📦 Creating resource group..."
az group create \
  --name recipe-finder-rg \
  --location "East US"

# Step 3: Create App Service Plan
echo "⚡ Creating App Service Plan..."
az appservice plan create \
  --name recipe-finder-plan \
  --resource-group recipe-finder-rg \
  --sku B1 \
  --is-linux

# Step 4: Create Web App
echo "🌐 Creating Web App..."
az webapp create \
  --resource-group recipe-finder-rg \
  --plan recipe-finder-plan \
  --name recipe-finder-app \
  --runtime "NODE|18-lts"

# Step 5: Build and Deploy
echo "🔨 Building React app..."
npm run build

echo "🚀 Deploying to Azure..."
az webapp up \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --location "East US" \
  --sku B1 \
  --runtime "NODE|18-lts"

echo "✅ Setup complete! Your app is live at: http://recipe-finder-app.azurewebsites.net"
