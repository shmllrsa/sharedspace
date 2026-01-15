#!/bin/bash

# Quick Deployment Guide for SharedSpace

echo "🚀 SharedSpace Deployment Helper"
echo "================================"
echo ""

# Check if we're in the right directory
if [ ! -f "BACKEND_DEPLOY.md" ]; then
    echo "❌ Please run this from the SharedSpace project root directory"
    exit 1
fi

echo "📦 Step 1: Commit your changes"
echo "Run these commands:"
echo ""
echo "  git add ."
echo "  git commit -m 'Fix: Production deployment setup'"
echo "  git push"
echo ""
read -p "Press Enter when you've pushed to GitHub..."

echo ""
echo "🌐 Step 2: Deploy Backend to Render"
echo "================================"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up/Login (use GitHub login)"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Select your SharedSpace repo"
echo ""
echo "Configure the service:"
echo "  - Name: shared-space-api"
echo "  - Root Directory: backend"
echo "  - Build Command: npm install"
echo "  - Start Command: npm start"
echo "  - Plan: Free"
echo ""
read -p "Press Enter when service is created..."

echo ""
echo "🔐 Step 3: Add Environment Variables"
echo "================================"
echo ""
echo "In Render dashboard, go to 'Environment' tab and add:"
echo ""
echo "MONGO_URI=your_mongodb_connection_string"
echo "SECRET_KEY=your_jwt_secret"
echo "CLOUDINARY_CLOUD_NAME=your_cloud_name"
echo "CLOUDINARY_API_KEY=your_api_key"
echo "CLOUDINARY_API_SECRET=your_api_secret"
echo ""
echo "Don't have MongoDB? Get free one at: https://www.mongodb.com/cloud/atlas"
echo ""
read -p "Press Enter when environment variables are set..."

echo ""
echo "⏳ Step 4: Wait for Deployment"
echo "================================"
echo "Render will now build and deploy your backend (5-10 minutes)"
echo "Your backend URL will be something like:"
echo "https://shared-space-api.onrender.com"
echo ""
read -p "Enter your backend URL when ready: " BACKEND_URL

echo ""
echo "🎨 Step 5: Update Frontend"
echo "================================"

# Update .env.production
cat > frontend/SharedSpace/.env.production << EOF
VITE_API_URL=$BACKEND_URL
EOF

echo "✅ Updated .env.production with: $BACKEND_URL"
echo ""
echo "Now run:"
echo "  git add frontend/SharedSpace/.env.production"
echo "  git commit -m 'Update production API URL'"
echo "  git push"
echo ""
read -p "Press Enter when you've pushed..."

echo ""
echo "☁️  Step 6: Configure Vercel"
echo "================================"
echo ""
echo "1. Go to https://vercel.com/dashboard"
echo "2. Select your 'shared-space-xi' project"
echo "3. Go to Settings → Environment Variables"
echo "4. Add new variable:"
echo "   - Name: VITE_API_URL"
echo "   - Value: $BACKEND_URL"
echo "   - Environments: Check all (Production, Preview, Development)"
echo "5. Click 'Save'"
echo "6. Go to Deployments tab"
echo "7. Click '...' on latest deployment → 'Redeploy'"
echo ""
echo "✨ Done! Your app should be live in a few minutes!"
echo ""
echo "🧪 Test it:"
echo "   Frontend: https://shared-space-xi.vercel.app/login"
echo "   Backend: $BACKEND_URL"
