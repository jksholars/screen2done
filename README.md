# ScreenTask 📸 → ✅

Transform your iPhone screenshots into organized to-do lists using AI.

## Features

- 📱 **Bulk Upload**: Process up to 100 screenshots at once
- 🤖 **AI-Powered Analysis**: Uses Claude Sonnet 4 to intelligently categorize tasks
- 🎯 **Smart Categorization**: Automatically sorts into Shopping, Reading, Cooking, Articles, or Other
- ⏰ **Urgency Detection**: Identifies time-sensitive items like sales and limited stock
- 📤 **Multiple Export Options**: 
  - Things (via URL scheme)
  - Apple Reminders (.ics file)
  - Apple Notes (copy to clipboard)
- 🎨 **Beautiful UI**: Cyberpunk-inspired mobile-first design

## Prerequisites

- Node.js 16+ installed
- Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com/))

## Quick Start

### 1. Clone or Download

Download the `screentask-server` folder to your computer.

### 2. Install Dependencies

```bash
cd screentask-server
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-actual-api-key-here
PORT=3000
```

### 4. Start the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

### 5. Open in Browser

Open your browser (works best on mobile Safari or Chrome) and go to:
```
http://localhost:3000
```

## Usage

1. **Upload Screenshots**: Tap the upload area and select screenshots from your camera roll
2. **Analyze**: Click "Analyze with AI" and wait for processing
3. **Review**: See your organized to-do list sorted by category
4. **Export**: Choose your preferred export method (Things, Reminders, or Notes)
5. **Clean Up**: Delete the processed screenshots from your Photos app

## Development

Run with auto-restart on file changes:

```bash
npm run dev
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/analyze` - Batch analysis (returns all results at once)
- `POST /api/analyze-batch` - Streaming analysis (Server-Sent Events)

## Deployment

### Deploy to Railway

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your repo
4. Add environment variable: `ANTHROPIC_API_KEY`
5. Railway will auto-deploy

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Add environment variable in Vercel dashboard
4. Deploy

### Deploy to Heroku

1. Install Heroku CLI
2. Run:
```bash
heroku create screentask-app
heroku config:set ANTHROPIC_API_KEY=your-key-here
git push heroku main
```

## Mobile Access

### Local Network Access

To access from your phone on the same WiFi:

1. Find your computer's IP address:
   - Mac: System Preferences → Network
   - Windows: `ipconfig` in CMD
   - Linux: `ifconfig` or `ip addr`

2. On your phone, visit:
   ```
   http://YOUR-COMPUTER-IP:3000
   ```
   Example: `http://192.168.1.100:3000`

### Make it a PWA (Progressive Web App)

The app can be installed on your phone's home screen:

1. Open the app in Safari (iOS) or Chrome (Android)
2. Tap the Share button
3. Select "Add to Home Screen"
4. Now you can open it like a native app!

## Architecture

- **Frontend**: React (single HTML file)
- **Backend**: Express.js + Node.js
- **AI**: Anthropic Claude Sonnet 4 via API
- **File Handling**: Multer for multipart uploads
- **Streaming**: Server-Sent Events for real-time progress

## Cost Considerations

Claude API pricing (as of Jan 2025):
- Input: ~$3 per million tokens
- Output: ~$15 per million tokens

Approximate cost per screenshot: $0.01-0.03

For 100 screenshots: ~$1-3

## Security Notes

- API keys are stored server-side in `.env` (never committed to git)
- Screenshots are processed in-memory and never stored
- CORS is enabled for local development

## Troubleshooting

### "Failed to fetch" error
- Make sure the server is running (`npm start`)
- Check that you're accessing the correct URL
- Verify your API key is valid in `.env`

### Server won't start
- Check if port 3000 is already in use
- Try changing `PORT` in `.env` to 3001 or another port

### Images not uploading
- File size limit is 10MB per image
- Max 100 files at once
- Supported formats: JPG, PNG, WEBP

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Credits

Built with:
- [Claude AI](https://www.anthropic.com/claude) by Anthropic
- [Express.js](https://expressjs.com/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

Made with ⚡ by [Your Name]
