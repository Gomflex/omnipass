# OMNIPASS Deployment Guide

## Prerequisites
- GitHub account
- Supabase account (https://supabase.com)
- Render.com account (https://render.com)
- Vercel account (https://vercel.com)

---

## Step 1: Setup Supabase Database

1. Go to https://supabase.com and sign in
2. Create a new project
3. Wait for the database to be ready
4. Go to **Settings** > **Database**
5. Find the **Connection String** (URI format)
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`
6. Copy this connection string (you'll need it for Render)

---

## Step 2: Push Code to GitHub

```bash
cd C:/Users/leeky/Desktop/Omnipass

# Initialize git if not already done
git init
git add .
git commit -m "Prepare for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/omnipass.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy Backend to Render.com

1. Go to https://render.com and sign in
2. Click **New +** > **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name**: omnipass-api
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Root Directory**: backend
   - **Runtime**: Python 3
   - **Build Command**: `./build.sh`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Plan**: Free

5. Add Environment Variables:
   - `DATABASE_URL`: (Paste your Supabase connection string from Step 1)
   - `SECRET_KEY`: (Generate a random string: https://randomkeygen.com)
   - `ALGORITHM`: HS256
   - `ACCESS_TOKEN_EXPIRE_MINUTES`: 30
   - `DEBUG`: False

6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy your Render URL (e.g., `https://omnipass-api.onrender.com`)

---

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign in
2. Click **Add New** > **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: frontend
   - **Build Command**: npm run build
   - **Output Directory**: .next

5. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://YOUR-RENDER-URL.onrender.com/api` (from Step 3)

6. Click **Deploy**
7. Wait for deployment to complete
8. Copy your Vercel URL (e.g., `https://omnipass.vercel.app`)

---

## Step 5: Update Backend CORS

1. Go back to Render.com
2. Open your **omnipass-api** service
3. Go to **Environment**
4. Add new environment variable:
   - Key: `ALLOWED_ORIGINS`
   - Value: `["https://YOUR-VERCEL-URL.vercel.app"]`
5. Save and wait for automatic redeploy

---

## Step 6: Test Your Deployment

1. Visit your Vercel URL
2. Try to register a new account
3. Try to login
4. Check if everything works!

---

## Troubleshooting

### Backend Issues
- Check Render logs: Dashboard > Your Service > Logs
- Verify DATABASE_URL is correct
- Ensure all environment variables are set

### Frontend Issues  
- Check Vercel logs: Dashboard > Your Project > Deployments > View Logs
- Verify NEXT_PUBLIC_API_URL points to your Render backend
- Check browser console for errors

### Database Issues
- Check Supabase dashboard for connection issues
- Verify the connection string format
- Ensure database is not paused (free tier pauses after inactivity)

---

## Important Notes

1. **Free Tier Limitations**:
   - Render free tier: Service spins down after 15 min of inactivity
   - First request after inactivity takes ~30 seconds (cold start)
   - Supabase free tier: Database pauses after 1 week of inactivity

2. **Security**:
   - Never commit .env files
   - Use strong SECRET_KEY in production
   - Keep your API keys secure

3. **Custom Domain** (Optional):
   - Vercel: Project Settings > Domains
   - Render: Service Settings > Custom Domain

---

## Local Development with Production Database

Update `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Update `backend/.env`:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
```

Then run:
```bash
# Backend
cd backend
uvicorn app.main:app --reload

# Frontend  
cd frontend
npm run dev
```

