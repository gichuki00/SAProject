# Azure Deployment Guide for React Recipe Finder App

## 🚀 Overview

This guide will walk you through deploying your React Recipe Finder application to Microsoft Azure using Azure App Service.

## 📋 Prerequisites

1. **Azure Account**: Free or paid Azure subscription
2. **Azure CLI**: Installed and configured
3. **Git**: For version control
4. **Node.js**: Latest version (18+ recommended)
5. **Visual Studio Code**: With Azure extensions

---

## 🛠️ Step 1: Prepare Your React App for Production

### 1.1 Update Package.json
Ensure your `package.json` has the correct build script:

```json
{
  "name": "recipe-finder",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "react-scripts": "5.0.1",
    "firebase": "^9.6.0",
    "react-icons": "^4.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 1.2 Create Azure Deployment Configuration
Create `web.config` in the `public` folder:

```xml
<?xml version="1.0"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="React Routes" stopProcessing="true">
          <match url=".*" />
          <conditions>
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
            <add input="{REQUEST_URI}" pattern="^/(api)" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <mimeMap fileExtension=".json" mimeType="application/json" />
      <mimeMap fileExtension=".woff" mimeType="application/font-woff" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
  </system.webServer>
</configuration>
```

### 1.3 Update Firebase Configuration for Production
Create environment-specific Firebase config:

```javascript
// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyBHmsGIPXk7XPelzKJWLN4MBws8y-vpQq0",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "serveradminproject.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "serveradminproject",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "serveradminproject.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "623711946944",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:623711946944:web:5a6bcf89c4fcb4ead48525"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;
```

### 1.4 Create .env file for production
Create `.env.production`:

```
REACT_APP_FIREBASE_API_KEY=your_production_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

---

## 🌐 Step 2: Set Up Azure Resources

### 2.1 Create Resource Group
```bash
# Login to Azure
az login

# Create resource group
az group create \
  --name recipe-finder-rg \
  --location "East US"
```

### 2.2 Create App Service Plan
```bash
az appservice plan create \
  --name recipe-finder-plan \
  --resource-group recipe-finder-rg \
  --sku B1 \
  --is-linux
```

### 2.3 Create Web App
```bash
az webapp create \
  --resource-group recipe-finder-rg \
  --plan recipe-finder-plan \
  --name recipe-finder-app \
  --runtime "NODE|18-lts"
```

---

## 🚀 Step 3: Deploy Using Azure CLI

### 3.1 Build Your React App
```bash
# Install dependencies
npm install

# Build for production
npm run build
```

### 3.2 Deploy to Azure
```bash
# Deploy the build folder
az webapp up \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --location "East US" \
  --sku B1 \
  --runtime "NODE|18-lts"
```

### 3.3 Alternative: ZIP Deployment
```bash
# Create ZIP file
cd build
zip -r ../app.zip .
cd ..

# Deploy ZIP
az webapp deployment source config-zip \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --src app.zip
```

---

## 🔧 Step 4: Configure App Service Settings

### 4.1 Set Environment Variables
```bash
# Set environment variables
az webapp config appsettings set \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --settings \
    REACT_APP_FIREBASE_API_KEY="your_production_api_key" \
    REACT_APP_FIREBASE_AUTH_DOMAIN="your_project.firebaseapp.com" \
    REACT_APP_FIREBASE_PROJECT_ID="your_project_id"
```

### 4.2 Enable Always On
```bash
az webapp config set \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --always-on true
```

### 4.3 Configure Auto-Swap (Optional)
```bash
az webapp deployment slot create \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --slot staging

az webapp deployment slot swap \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --slot staging \
  --action swap
```

---

## 🔄 Step 5: Set Up Continuous Deployment (GitHub Actions)

### 5.1 Create GitHub Actions Workflow
Create `.github/workflows/azure-deploy.yml`:

```yaml
name: Deploy to Azure App Service

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build React app
      run: npm run build
      env:
        REACT_APP_FIREBASE_API_KEY: ${{ secrets.REACT_APP_FIREBASE_API_KEY }}
        REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.REACT_APP_FIREBASE_AUTH_DOMAIN }}
        REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.REACT_APP_FIREBASE_PROJECT_ID }}
    
    - name: Deploy to Azure
      uses: azure/webapps-deploy@v2
      with:
        app-name: 'recipe-finder-app'
        slot-name: 'production'
        publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
        package: 'build'
```

### 5.2 Set Up GitHub Secrets
In your GitHub repository:
1. Go to Settings → Secrets and variables → Actions
2. Add these secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure portal
   - `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
   - `REACT_APP_FIREBASE_PROJECT_ID`: Your Firebase project ID

---

## 🌍 Step 6: Custom Domain and SSL (Optional)

### 6.1 Add Custom Domain
```bash
# Add custom domain
az webapp config hostname add \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --hostname www.yourdomain.com
```

### 6.2 Configure SSL
```bash
# Upload SSL certificate
az webapp config ssl upload \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --certificate-file path/to/certificate.pfx \
  --certificate-password your_password

# Bind SSL to domain
az webapp config ssl bind \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --certificate-thumbprint your_thumbprint \
  --ssl-type SNI \
  --hostname www.yourdomain.com
```

---

## 📊 Step 7: Monitor and Scale

### 7.1 Enable Application Insights
```bash
# Create Application Insights
az monitor app-insights component create \
  --app recipe-finder-insights \
  --location "East US" \
  --resource-group recipe-finder-rg \
  --application-type web

# Connect to App Service
az webapp config appsettings set \
  --resource-group recipe-finder-rg \
  --name recipe-finder-app \
  --settings \
    APPINSIGHTS_INSTRUMENTATIONKEY=$(az monitor app-insights component show \
      --app recipe-finder-insights \
      --resource-group recipe-finder-rg \
      --query instrumentationKey -o tsv)
```

### 7.2 Set Up Scaling
```bash
# Enable auto-scaling
az monitor autoscale create \
  --resource-group recipe-finder-rg \
  --resource recipe-finder-plan \
  --resource-type Microsoft.Web/serverfarms \
  --name recipe-finder-autoscale \
  --min-count 1 \
  --max-count 3 \
  --count 1
```

---

## 🔍 Step 8: Troubleshooting Common Issues

### 8.1 Build Errors
- Check Node.js version compatibility
- Verify all dependencies are installed
- Check for environment variable issues

### 8.2 Deployment Issues
- Verify Azure CLI authentication
- Check resource group permissions
- Validate App Service configuration

### 8.3 Runtime Issues
- Check Azure logs: `az webapp log tail`
- Verify Firebase configuration
- Check CORS settings

### 8.4 Performance Issues
- Enable CDN
- Optimize bundle size
- Configure caching headers

---

## 💰 Cost Optimization

### Free Tier Options
- Use B1 App Service Plan (~$10/month)
- Enable Azure Free Tier credits
- Use Azure DevOps for CI/CD

### Cost Monitoring
```bash
# Monitor costs
az consumption usage list \
  --resource-group recipe-finder-rg \
  --output table
```

---

## 🚀 Quick Deployment Commands

```bash
# 1. Login and set up
az login
az group create --name recipe-finder-rg --location "East US"

# 2. Create resources
az appservice plan create --name recipe-finder-plan --resource-group recipe-finder-rg --sku B1 --is-linux
az webapp create --resource-group recipe-finder-rg --plan recipe-finder-plan --name recipe-finder-app --runtime "NODE|18-lts"

# 3. Build and deploy
npm run build
cd build
zip -r ../app.zip .
cd ..
az webapp deployment source config-zip --resource-group recipe-finder-rg --name recipe-finder-app --src app.zip

# 4. Access your app
echo "Your app is live at: http://recipe-finder-app.azurewebsites.net"
```

---

## 📞 Support Resources

- [Azure App Service Documentation](https://docs.microsoft.com/azure/app-service/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [React on Azure Guide](https://docs.microsoft.com/azure/app-service/quickstart-nodejs?tabs=windows&pivots=platform-linux)
- [Azure Pricing Calculator](https://azure.microsoft.com/pricing/calculator/)

---

**🎉 Congratulations!** Your React Recipe Finder app is now deployed on Azure and accessible to users worldwide!
