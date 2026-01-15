# Deploying to Vercel - Fix Login Issue

## Problem
The app was using hardcoded `http://localhost:3000` for all API calls, which doesn't work in production.

## Solution Applied
1. ✅ All API endpoints now use `import.meta.env.VITE_API_URL`
2. ✅ Created `.env.local` for local development
3. ✅ Created `.env.production` template for production
4. ✅ Updated backend CORS to allow Vercel domain

## Steps to Deploy

### 1. Deploy Your Backend First
Your backend needs to be deployed somewhere accessible. Options:
- **Heroku** (easiest for Node.js)
- **Railway**
- **Render**
- **DigitalOcean App Platform**

Make sure you set these environment variables on your backend host:
- `MONGO_URI` - Your MongoDB connection string
- `SECRET_KEY` - Your JWT secret
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

### 2. Update Backend CORS
The backend `server.js` has been updated to allow requests from your Vercel app:
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://shared-space-xi.vercel.app'  // ✅ Your Vercel app
];
```

Make sure to **deploy this updated backend** before testing the frontend!

### 3. Update Frontend Environment File
Edit `frontend/SharedSpace/.env.production`:

```bash
VITE_API_URL=https://your-actual-backend-url.com
```

**Important:** 
- Do NOT include a trailing slash!
- Replace with your actual deployed backend URL
- Example: `https://sharedspace-api.herokuapp.com`

### 4. Configure Vercel Environment Variables
In your Vercel project dashboard:
1. Go to **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `VITE_API_URL`
   - **Value:** Your backend URL (e.g., `https://sharedspace-api.herokuapp.com`)
   - **Environment:** Production, Preview, and Development

### 5. Redeploy Frontend to Vercel
Option A - Push to GitHub (if connected):
```bash
git add .
git commit -m "Fix API endpoints for production"
git push
```

Option B - Manual deploy:
```bash
cd frontend/SharedSpace
npm run build
# Then use Vercel CLI or redeploy from dashboard
```

### 6. Test the Deployment
1. Open https://shared-space-xi.vercel.app/login
2. Open browser DevTools (F12) → Network tab
3. Try to login
4. Check the network request - it should go to your backend URL, NOT localhost
5. If you see CORS errors, verify step 2 was completed

## Common Issues

### Issue: "Network request failed" or "Connection refused"
**Solution:** Your backend URL in Vercel env vars is wrong or backend is down.

### Issue: CORS error in console
**Solution:** Make sure you deployed the updated `server.js` with the correct Vercel URL in `allowedOrigins`.

### Issue: 404 on API requests
**Solution:** Check that your backend routes are set up correctly and the backend is running.

## Testing Locally
The app will continue to use `http://localhost:3000` when running locally via `.env.local`.

To test:
```bash
cd frontend/SharedSpace
npm run dev
```

## Next Steps
Once login works, you'll need to ensure:
1. MongoDB is accessible from your backend host
2. Cloudinary credentials are set
3. All environment variables are configured on the backend
