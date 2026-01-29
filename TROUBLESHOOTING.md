# Railway Crash Troubleshooting Guide

If your app says "crashed" on Railway, follow these steps:

## Step 1: Check the Deployment Logs

1. Go to your Railway project dashboard
2. Click on your service (screentask)
3. Click the **"Deployments"** tab
4. Click on the most recent deployment
5. Look at the **Build Logs** and **Deploy Logs**

**What to look for:**
- Red error messages
- "Module not found" errors
- "ANTHROPIC_API_KEY" errors

---

## Common Fixes

### Fix 1: Missing API Key (Most Common)

**Symptom:** Logs say "ANTHROPIC_API_KEY is not defined" or app crashes immediately

**Solution:**
1. Click the **"Variables"** tab in your Railway project
2. Make sure you have a variable called `ANTHROPIC_API_KEY`
3. The value should start with `sk-ant-`
4. If it's missing, add it:
   - Click **"+ New Variable"**
   - Name: `ANTHROPIC_API_KEY`
   - Value: Your API key
   - Click **"Add"**
5. Railway will automatically redeploy

### Fix 2: Wrong Start Command

**Symptom:** Logs say "Cannot find module" or "No start command"

**Solution:**
1. I've added `Procfile` and `railway.json` to fix this
2. Re-upload the updated files to GitHub:
   - Download the new ZIP file I'll provide
   - Upload `Procfile` and `railway.json` to your GitHub repo
   - Railway will redeploy automatically

### Fix 3: Port Configuration

**Symptom:** App builds but shows "Application failed to respond"

**Solution:**
The server is already configured to use Railway's PORT variable, but double-check:

1. In Railway, go to **"Variables"** tab
2. Railway should automatically provide a `PORT` variable
3. If not, the app defaults to 3000 which is fine

### Fix 4: Memory Limits

**Symptom:** App crashes after processing many images

**Solution:**
1. Railway free tier has memory limits
2. Process fewer screenshots at a time (20-30 instead of 100)
3. Or upgrade Railway plan for more memory

---

## Step-by-Step Fix (Most Common Issue)

If you're getting crashes, here's what to do:

### 1. Update Your Files

Download the new ZIP file (it includes `Procfile` and `railway.json`)

### 2. Update GitHub

1. Go to your GitHub repository
2. Click **"Add file"** → **"Upload files"**
3. Upload these new files:
   - `Procfile`
   - `railway.json`
4. Click **"Commit changes"**

### 3. Check API Key in Railway

1. Go to Railway dashboard
2. Click your project → **"Variables"** tab
3. Verify `ANTHROPIC_API_KEY` exists with your key
4. If missing, add it now

### 4. Watch the Deployment

1. Railway will automatically redeploy
2. Go to **"Deployments"** tab
3. Watch the logs scroll
4. Look for: "✅ ScreenTask server running on http://localhost:3000"

### 5. Test the URL

1. Once deployed (green checkmark), go to **"Settings"** → **"Networking"**
2. Copy your public URL
3. Open it in a browser
4. You should see the ScreenTask app!

---

## Still Crashing?

### Check Deploy Logs for Specific Errors

Copy any error messages from the Deploy Logs and look for these common ones:

**Error: "Cannot find module '@anthropic-ai/sdk'"**
- **Fix:** Railway should auto-install. Try clicking "Redeploy" in deployments

**Error: "ENOENT: no such file or directory"**
- **Fix:** Make sure the `public` folder with `index.html` is uploaded to GitHub

**Error: "listen EADDRINUSE"**
- **Fix:** This shouldn't happen on Railway. Click "Redeploy"

**Error: "Invalid API key"**
- **Fix:** Check your API key at console.anthropic.com, create a new one if needed

---

## Manual Redeploy

Sometimes you just need to force a fresh deployment:

1. Go to **"Deployments"** tab
2. Find your latest deployment
3. Click the three dots (•••)
4. Select **"Redeploy"**
5. Watch it build again

---

## Last Resort: Start Fresh

If nothing works:

1. **Delete the Railway project:**
   - Settings → Danger → Delete Service

2. **Create new project:**
   - Follow the deployment guide again
   - Make SURE to add the API key in Variables
   - Use the updated code with Procfile and railway.json

---

## Getting Help from Railway

If you're still stuck:

1. **Check Railway Status:**
   - Go to https://status.railway.app
   - Make sure there are no outages

2. **Railway Discord:**
   - Join: https://discord.gg/railway
   - Ask in #help channel
   - Share your error logs

3. **Railway Docs:**
   - https://docs.railway.app/troubleshoot/fixing-common-errors

---

## What Success Looks Like

When it's working, you should see:

**In Deploy Logs:**
```
✅ ScreenTask server running on http://localhost:3000
📝 API endpoints:
   - GET  /api/health
   - POST /api/analyze
   - POST /api/analyze-batch
```

**In Browser:**
- Your Railway URL loads the ScreenTask app
- You can upload screenshots
- Analyze button works
- You see categorized to-dos

**In Variables Tab:**
- `ANTHROPIC_API_KEY` = sk-ant-xxxxx (your key)
- `PORT` = (Railway auto-sets this)

---

## Quick Checklist

Before asking for help, verify:

- [ ] API key is set in Railway Variables
- [ ] API key starts with `sk-ant-`
- [ ] `Procfile` and `railway.json` are in GitHub
- [ ] `public/index.html` exists in GitHub
- [ ] Deploy logs show "ScreenTask server running"
- [ ] No red errors in deploy logs
- [ ] Railway service shows "Active" (green)

If all checked and still crashing, share your deploy logs!

---

**Need the updated files?** I'll create a new ZIP with Procfile and railway.json included.
