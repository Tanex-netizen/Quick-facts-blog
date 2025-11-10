# Deployment Guide - Quick Facts Blog
## Vercel (Frontend) + Render (Backend)

This guide walks you through deploying your Quick Facts Blog with **Vercel for frontend** (optimal Next.js performance) and **Render for backend** (Node.js API).

## Prerequisites

Before deploying, ensure you have:
- ✅ GitHub repository pushed (https://github.com/Tanex-netizen/Quick-facts-blog)
- ✅ Supabase project with database set up and categories seeded
- ✅ Cloudinary account with unsigned upload preset created (`quick_facts_unsigned`)
- ✅ Google AdSense account (optional, for production ads)
- ✅ Render account (sign up at https://render.com)
- ✅ Vercel account (sign up at https://vercel.com with your GitHub)

---

## 🚀 Part 1: Deploy Backend to Render (5 minutes)

### Step 1: Create Web Service on Render

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click "New +"** in the top right
3. **Select "Web Service"**
4. **Connect GitHub Repository**:
   - Click "Connect account" if first time
   - Find and select: `Tanex-netizen/Quick-facts-blog`
   - Click "Connect"

5. **Configure Service Settings**:
   ```
   Name: quick-facts-backend
   Region: Oregon (US West) or closest to your users
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Instance Type: Free
   ```

### Step 2: Set Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"** → Click **"Add Environment Variable"**

Add these variables one by one:

```bash
# Port Configuration
PORT=4000

# Supabase Configuration (Get from: https://supabase.com/dashboard → Your Project → Settings → API)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-service-role-key-here

# Cloudinary Configuration (Get from: https://console.cloudinary.com/settings)
CLOUDINARY_CLOUD_NAME=dwcxvaswf
CLOUDINARY_API_KEY=your-api-key-here
CLOUDINARY_API_SECRET=your-api-secret-here

# CORS Configuration (We'll update this after deploying frontend)
FRONTEND_ORIGIN=http://localhost:3000

# Environment
NODE_ENV=production
```

**⚠️ Important Notes**:
- Use your **service_role** key from Supabase (not the anon key) - has full database access
- Keep `FRONTEND_ORIGIN=http://localhost:3000` for now - we'll update it after deploying frontend
- Never share your service_role key or API secrets publicly

### Step 3: Deploy Backend

1. **Click "Create Web Service"** (bottom of page)
2. **Wait for deployment**: This takes 3-5 minutes
   - Watch the logs for any errors
   - Look for: "Server running on port 4000" and "✅ Scheduled posts worker running..."
3. **Copy your backend URL**: Once deployed, you'll see something like:
   ```
   https://quick-facts-backend.onrender.com
   ```
   **Save this URL** - you'll need it for frontend deployment!

### Step 4: Test Backend

Open your backend URL in browser or use curl:
```bash
# Test posts endpoint (should return [] or your posts)
curl https://quick-facts-backend.onrender.com/api/posts

# Test health check (should return "Quick Facts API is running")
curl https://quick-facts-backend.onrender.com/
```

If you see errors, check the logs in Render dashboard → Your Service → "Logs"

---

## 🎨 Part 2: Deploy Frontend to Vercel (2 minutes)

### Step 1: Import GitHub Repository to Vercel

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Click "Add New..."** → **"Project"**
3. **Import Git Repository**:
   - Find `Tanex-netizen/Quick-facts-blog`
   - Click "Import"

4. **Configure Project**:
   ```
   Framework Preset: Next.js (auto-detected ✓)
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

### Step 2: Set Environment Variables

Before deploying, click **"Environment Variables"** and add:

```bash
# Backend API URL (use your Render backend URL from Part 1)
NEXT_PUBLIC_API_URL=https://quick-facts-backend.onrender.com

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwcxvaswf
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=quick_facts_unsigned

# Google AdSense (use real ID or keep placeholder for testing)
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
```

**⚠️ Critical**: 
- Replace `https://quick-facts-backend.onrender.com` with YOUR actual backend URL
- All variables must have `NEXT_PUBLIC_` prefix to work in browser
- Don't add quotes around values in Vercel

### Step 3: Deploy Frontend

1. **Click "Deploy"**
2. **Wait for deployment**: Takes ~30 seconds 🚀
3. **Vercel will provide your URL**:
   ```
   https://quick-facts-blog.vercel.app
   ```
   or something like:
   ```
   https://quick-facts-blog-xyz123.vercel.app
   ```
   **Save this URL** - you'll need it for CORS configuration!

### Step 4: Test Frontend (Will Have CORS Errors - Normal!)

1. Visit your Vercel URL
2. Open browser console (F12)
3. You'll see CORS errors like: `Access to fetch at 'https://...' has been blocked by CORS policy`
4. **Don't worry!** We'll fix this in Part 3

---

## 🔗 Part 3: Connect Frontend & Backend (Fix CORS) - 2 minutes

Now we need to tell the backend to accept requests from your Vercel frontend.

### Step 1: Update Backend CORS Environment Variable

1. **Go to Render Dashboard**: https://dashboard.render.com
2. **Click on your backend service** (`quick-facts-backend`)
3. **Go to "Environment" tab** (left sidebar)
4. **Find the `FRONTEND_ORIGIN` variable**
5. **Update its value** to your Vercel URL:
   ```
   https://quick-facts-blog.vercel.app
   ```
   (Use YOUR actual Vercel URL from Part 2)

6. **If you want to allow multiple domains** (e.g., localhost + production), use comma-separated:
   ```
   http://localhost:3000,https://quick-facts-blog.vercel.app
   ```

7. **Click "Save Changes"**

### Step 2: Redeploy Backend

1. Still in your backend service on Render
2. Click **"Manual Deploy"** (top right)
3. Click **"Deploy latest commit"**
4. Wait ~2-3 minutes for redeploy

### Step 3: Test Connection

1. **Visit your Vercel frontend URL**
2. **Open browser console** (F12 → Console tab)
3. **Check for errors**:
   - ✅ No CORS errors = Success!
   - ❌ Still seeing CORS errors? Double-check:
     - Vercel URL matches exactly (including https://)
     - No trailing slash in URL
     - Backend redeployed successfully

4. **Test functionality**:
   - Homepage should load posts (or show empty state if no posts)
   - Try creating a post from `/admin` (login: admin / quickfacts@12345)
   - Upload an image - should work with Cloudinary

---

## 🎉 Part 4: Final Verification & Testing

### 1. Test Backend API

```bash
# Test posts endpoint
curl https://your-backend-url.onrender.com/api/posts

# Test health check
curl https://your-backend-url.onrender.com/
```

### 2. Test Frontend

Visit your Vercel URL and test:

**Homepage**:
- [ ] Posts load correctly (or empty state shows)
- [ ] Search functionality works
- [ ] Click on a post → post detail page loads
- [ ] Sidebar shows categories
- [ ] AdSense placeholders appear (or real ads if configured)

**Admin Panel** (`/admin`):
- [ ] Login works (email: `admin`, password: `quickfacts@12345`)
- [ ] Create new post form appears
- [ ] Upload image → Cloudinary upload works
- [ ] Fill title, description, category, content
- [ ] Publish immediately → post appears on homepage
- [ ] Schedule post for future → appears in post history with scheduled status
- [ ] Edit existing post works
- [ ] Delete post works
- [ ] Logout button works

**Post Detail Page** (`/post/[id]`):
- [ ] Post content displays correctly
- [ ] Image loads from Cloudinary
- [ ] Related posts section shows posts
- [ ] AdSense box appears below content

### 3. Test Scheduled Posts Worker

1. Go to Render → Backend service → **"Logs"**
2. Look for: `✅ Scheduled posts worker running...`
3. Create a scheduled post for 2 minutes in the future
4. Wait 2 minutes
5. Refresh homepage → post should appear automatically

### 4. Monitor Logs

**Render Backend Logs**:
- Render Dashboard → Backend service → "Logs"
- Watch for errors, API requests, scheduled post executions

**Vercel Frontend Logs**:
- Vercel Dashboard → Your project → "Deployments" → Click latest → "Functions"
- Check for errors in server-side rendering

---

## 🌐 Part 5: Optional - Custom Domain & Production Setup

### Set Up Custom Domain on Vercel (Recommended)

1. **In Vercel Dashboard** → Your project → "Settings" → "Domains"
2. **Add your domain**: e.g., `quickfacts.com` or `www.quickfacts.com`
3. **Configure DNS** (at your domain registrar):
   ```
   Type: A
   Name: @ (or www)
   Value: 76.76.21.21 (Vercel's IP)
   
   OR
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Wait for DNS propagation** (5-60 minutes)
5. **SSL certificate auto-generated** by Vercel ✓

### Update CORS After Adding Custom Domain

If you add a custom domain, update backend CORS:

1. Render Dashboard → Backend → "Environment"
2. Update `FRONTEND_ORIGIN`:
   ```
   https://quickfacts.com,https://www.quickfacts.com,https://quick-facts-blog.vercel.app
   ```
3. Redeploy backend

---

## 📊 Part 6: Monitoring & Maintenance

### Update Your Deployed Code

**When you make changes to your code:**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```

2. **Automatic Deployments**:
   - **Vercel**: Deploys automatically on push (~30 seconds)
   - **Render**: Deploys automatically on push (~3-5 minutes)
   - Watch deployment progress in dashboards

3. **Manual Redeploy** (if needed):
   - Vercel: Dashboard → Your project → "Deployments" → "Redeploy"
   - Render: Dashboard → Your service → "Manual Deploy"

### View Logs

**Render Backend**:
- Dashboard → Backend service → "Logs"
- Real-time logs of API requests, errors, scheduled posts

**Vercel Frontend**:
- Dashboard → Your project → "Deployments" → Click latest → "Functions"
- Server-side rendering logs and errors

### Update Environment Variables

**Render**:
- Dashboard → Your service → "Environment" tab
- Edit variables → Save → Requires redeploy

**Vercel**:
- Dashboard → Your project → "Settings" → "Environment Variables"
- Edit variables → Save → Redeploy required

---

## 🚨 Troubleshooting Common Issues

### CORS Errors

**Symptom**: Console shows "blocked by CORS policy"

**Solution**:
1. Check `FRONTEND_ORIGIN` in Render backend environment variables
2. Ensure it exactly matches your Vercel URL (including `https://`, no trailing slash)
3. Redeploy backend after changing
4. Clear browser cache and hard refresh (Ctrl+Shift+R)

### Backend Not Responding / 502 Error

**Symptom**: "Application failed to respond" or "Bad Gateway"

**Solution**:
1. Check Render backend logs for errors
2. Verify all environment variables are set correctly
3. Test Supabase connection: check SUPABASE_URL and SUPABASE_KEY
4. Free tier: Backend sleeps after 15min → first request takes 30-60s (cold start)

### Images Not Loading

**Symptom**: Broken images or upload fails

**Solution**:
1. Verify Cloudinary credentials in backend environment
2. Check unsigned preset name: `quick_facts_unsigned`
3. Ensure preset exists in Cloudinary dashboard (Settings → Upload)
4. Check `next.config.ts` has Cloudinary domain in `remotePatterns`

### Posts Not Showing on Homepage

**Symptom**: Empty homepage or "Failed to fetch"

**Solution**:
1. Check `NEXT_PUBLIC_API_URL` in Vercel environment variables
2. Test backend API directly: `curl https://your-backend.onrender.com/api/posts`
3. Verify database has posts (Supabase dashboard → Table Editor → posts)
4. Check browser console for JavaScript errors

### Scheduled Posts Not Publishing

**Symptom**: Scheduled posts stay scheduled after time passes

**Solution**:
1. Check Render backend logs → look for "✅ Scheduled posts worker running"
2. Verify worker is polling every 60 seconds
3. Check post `scheduled_at` is in past and `published_at` is null
4. Free tier: Backend sleeps → worker stops → wakes on first request

### Build Failed on Vercel

**Symptom**: Deployment fails with build errors

**Solution**:
1. Check Vercel deployment logs for specific error
2. Test locally: `cd frontend && npm run build`
3. Ensure all dependencies are in `package.json`
4. Check environment variables are set correctly
5. Look for TypeScript errors or missing imports

---

## 💰 Cost & Performance (Free Tier)

### What You Get For Free

**Vercel Free Tier**:
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL certificates
- ✅ Global CDN (edge network)
- ✅ Zero cold starts (always fast)
- ✅ Preview deployments for PRs
- ⚠️ Serverless functions: 100GB-hours/month

**Render Free Tier**:
- ✅ 750 hours/month (enough for one service)
- ✅ Automatic SSL certificates
- ✅ Auto-deploy from Git
- ⚠️ Services sleep after 15min inactivity
- ⚠️ Cold start: 30-60 seconds first request
- ⚠️ Single region (Oregon by default)

**Supabase Free Tier**:
- ✅ 500MB database storage
- ✅ 1GB file storage
- ✅ 50,000 monthly active users
- ✅ Social OAuth
- ⚠️ Pauses after 1 week inactivity

**Cloudinary Free Tier**:
- ✅ 25 monthly credits
- ✅ ~25GB storage + bandwidth
- ✅ Image optimization & transformations
- ⚠️ Overage charges if exceeded

### Performance Expectations

**Free Tier**:
- Frontend (Vercel): Fast (<500ms) globally ✅
- Backend (Render): Fast when warm, 30-60s cold start ⚠️
- First visit after inactivity: Slow (backend waking up)
- Subsequent visits: Fast

**Paid Tier** ($14/month - Render Starter + Vercel Free):
- Frontend: Same (always fast) ✅
- Backend: Always warm, no cold starts ✅
- Consistent fast performance ✅

---

## 📋 Production Checklist

## Production Checklist

Before going live:

- [ ] Replace placeholder AdSense client/slot IDs with real ones
---

## 📋 Production Checklist

Before going fully live with real traffic:

**Security & Authentication**:
- [ ] Replace sessionStorage auth with backend API + JWT tokens
- [ ] Add rate limiting to API endpoints (express-rate-limit)
- [ ] Use httpOnly cookies for auth tokens
- [ ] Enable CSRF protection
- [ ] Review and restrict Supabase RLS policies

**Performance**:
- [ ] Optimize images (use Cloudinary transformations)
- [ ] Enable Next.js image optimization
- [ ] Set up CDN caching headers
- [ ] Test load times with Lighthouse
- [ ] Consider upgrading to Render Starter ($7/month) to eliminate cold starts

**Monitoring**:
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Add uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure alerts for backend errors
- [ ] Set up Google Analytics or Plausible

**SEO & Marketing**:
- [ ] Replace AdSense placeholder IDs with real ones
- [ ] Create sitemap.xml for SEO
- [ ] Add Open Graph images
- [ ] Set up Google Search Console
- [ ] Test meta tags and social sharing

**Database & Backups**:
- [ ] Set up automatic Supabase backups
- [ ] Test restore procedure
- [ ] Monitor database usage
- [ ] Consider Supabase Pro ($25/month) for production

**Testing**:
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test scheduled posts end-to-end
- [ ] Test image uploads thoroughly
- [ ] Test admin panel on mobile

**Custom Domain** (Optional but recommended):
- [ ] Add custom domain to Vercel
- [ ] Update CORS to include custom domain
- [ ] Test SSL certificate
- [ ] Redirect www → non-www (or vice versa)

---

## 🆘 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Render Docs**: https://render.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Cloudinary Docs**: https://cloudinary.com/documentation
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

## 🎓 Quick Reference

### Important URLs

```
Backend (Render):    https://quick-facts-backend.onrender.com
Frontend (Vercel):   https://quick-facts-blog.vercel.app
Supabase Dashboard:  https://supabase.com/dashboard
Cloudinary Console:  https://console.cloudinary.com
Render Dashboard:    https://dashboard.render.com
Vercel Dashboard:    https://vercel.com/dashboard
```

### Environment Variables Summary

**Backend (Render)**:
```bash
PORT=4000
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=service_role_key
CLOUDINARY_CLOUD_NAME=dwcxvaswf
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
FRONTEND_ORIGIN=https://quick-facts-blog.vercel.app
NODE_ENV=production
```

**Frontend (Vercel)**:
```bash
NEXT_PUBLIC_API_URL=https://quick-facts-backend.onrender.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwcxvaswf
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=quick_facts_unsigned
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
```

### Common Commands

```bash
# Test backend API
curl https://your-backend.onrender.com/api/posts

# Local development
cd backend && npm run dev        # Backend on :4000
cd frontend && npm run dev       # Frontend on :3000

# Deploy updates
git add .
git commit -m "Update description"
git push origin main             # Auto-deploys both services

# Build locally
cd frontend && npm run build     # Test build before deploy
cd backend && npm test           # Run backend tests
```

---

## ✅ Deployment Complete!

Your Quick Facts Blog is now live! 🎉

**Next Steps**:
1. Visit your Vercel URL and explore the site
2. Login to admin panel and create your first post
3. Test scheduled posts
4. Monitor logs for any issues
5. Share your site and start publishing!

**Remember**:
- Free tier has cold starts (~30-60s first request)
- Upgrade to Render Starter ($7/month) for always-on backend
- Monitor Cloudinary usage (25 credits/month free)
- Update AdSense IDs when ready for real ads

Need help? Check the troubleshooting section or review service logs.

---

**Happy publishing! 🚀**
```bash
# Point to production backend
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dwcxvaswf
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=quick_facts_unsigned
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXX
```

---

**Need help?** Check Render logs first, then review this guide. Most issues are environment variable misconfigurations.

Good luck with your deployment! 🚀
