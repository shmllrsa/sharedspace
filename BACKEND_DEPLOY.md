# DEPLOY TO RENDER (FREE)

## Quick Deploy Steps:

### 1. Push to GitHub
```bash
cd /Users/shmllrs/Desktop/projects/SharedSpace
git add .
git commit -m "Prepare backend for deployment"
git push
```

### 2. Deploy on Render
1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name:** shared-space-api
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 3. Add Environment Variables in Render
In the Render dashboard, go to Environment tab and add:

```
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

### 4. Get Your Backend URL
After deployment completes (5-10 min), Render will give you a URL like:
`https://shared-space-api.onrender.com`

### 5. Update Frontend
Copy your Render URL and update:

**File:** `frontend/SharedSpace/.env.production`
```
VITE_API_URL=https://shared-space-api.onrender.com
```

### 6. Add to Vercel Environment Variables
1. Go to Vercel dashboard → Your project → Settings → Environment Variables
2. Add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://shared-space-api.onrender.com`
   - **Environments:** Production, Preview, Development

### 7. Redeploy Frontend on Vercel
```bash
git add .
git commit -m "Update API URL for production"
git push
```

Vercel will auto-deploy, or manually redeploy from dashboard.

---

## Alternative: Deploy to Railway

1. Go to https://railway.app
2. Click "Start a New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Node.js
5. Add environment variables in Variables tab
6. Get your URL from Settings

---

## Testing Your Deployment

1. Visit your backend URL: `https://your-backend.onrender.com`
2. You should see: "SharedSpace API is running..."
3. Test login at: `https://shared-space-xi.vercel.app/login`

---

## Important Notes

⚠️ **Render Free Tier:** Your backend will sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds to wake up.

💡 **MongoDB:** If you don't have MongoDB Atlas:
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to Render environment variables
