# ScreenTask - Quick Start Guide

## What You Have

A complete Node.js/Express server with React frontend that converts screenshots to to-do lists using Claude AI.

## File Structure

```
screentask-server/
├── server.js           # Express backend
├── package.json        # Dependencies
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── README.md          # Full documentation
└── public/
    └── index.html     # React frontend (mobile-optimized)
```

## Setup Steps (5 minutes)

### Step 1: Get Your API Key
1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Create a new API key
4. Copy it (starts with `sk-ant-`)

### Step 2: Install
Open Terminal/Command Prompt and run:

```bash
cd screentask-server
npm install
```

### Step 3: Configure
Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and paste your API key:
```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Step 4: Run
```bash
npm start
```

### Step 5: Use It
Open in browser: http://localhost:3000

## Using on Your Phone

### Option 1: Local Network (Same WiFi)
1. Find your computer's IP address
2. On your phone, go to: `http://YOUR-IP:3000`
3. Example: `http://192.168.1.100:3000`

### Option 2: Deploy Online (Recommended)
Deploy to Railway (free tier available):
1. Sign up at railway.app
2. Create new project from GitHub
3. Add ANTHROPIC_API_KEY environment variable
4. Get your public URL (e.g., `https://screentask.up.railway.app`)

## How It Works

1. **Upload**: Select up to 100 screenshots
2. **Analyze**: Click "Analyze with AI"
3. **Review**: See categorized to-do list
4. **Export**: Send to Things, Reminders, or Notes
5. **Clean up**: Delete screenshots from Photos

## Features

✅ Bulk processing (up to 100 images)
✅ Smart categorization (Shopping, Reading, Cooking, Articles, Other)
✅ Urgency detection (sales, limited stock)
✅ Multiple export formats
✅ Beautiful cyberpunk UI
✅ Real-time progress tracking
✅ No data storage (privacy-first)

## Cost

~$0.01-0.03 per screenshot
~$1-3 for 100 screenshots

## Need Help?

Check the full README.md for:
- Deployment guides
- Troubleshooting
- API documentation
- Advanced configuration

## Next Steps

1. Test with a few screenshots first
2. Customize the categories if needed
3. Deploy to make it accessible anywhere
4. Add to your phone's home screen as a PWA

Enjoy! 🚀
