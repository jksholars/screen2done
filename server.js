const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Anthropic = require('@anthropic-ai/sdk');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads (in-memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 100 // Max 100 files
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

// Read the HTML file
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Serve the HTML
app.get('/', (req, res) => {
  res.send(htmlContent);
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'ScreenTask API is running' });
});

// Batch analysis endpoint with Server-Sent Events
app.post('/api/analyze-batch', upload.array('screenshots', 100), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const totalFiles = req.files.length;

    // Process each file and send progress updates
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      
      try {
        const base64Image = file.buffer.toString('base64');
        const mediaType = file.mimetype || 'image/jpeg';

        const message = await anthropic.messages.create({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Image
                }
              },
              {
                type: 'text',
                text: `Analyze this screenshot and extract a to-do task. Return ONLY a JSON object with this exact structure:
{
  "task": "Brief action item (e.g., 'Read [Book Title]', 'Buy [Product Name]')",
  "category": "Shopping|Reading|Cooking|Articles|Other",
  "metadata": {
    "title": "Item/book/product title if visible",
    "price": "Price if visible (e.g., '$29.99')",
    "author": "Author if book",
    "urgency": "any time-sensitive info like 'Sale ends Friday' or 'Limited stock'"
  },
  "notes": "Additional relevant details"
}

Categories:
- Shopping: Amazon, product pages, things to buy
- Reading: Books, book covers, reading lists
- Cooking: Recipes, food items
- Articles: Blog posts, articles to read
- Other: Everything else

Be concise and actionable. Return ONLY the JSON, no other text.`
              }
            ]
          })
        });

        const textContent = message.content.find(c => c.type === 'text')?.text || '';
        
        let taskData;
        try {
          const jsonMatch = textContent.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            taskData = JSON.parse(jsonMatch[0]);
          } else {
            taskData = {
              task: textContent.substring(0, 100) || 'Unknown task',
              category: 'Other',
              metadata: {},
              notes: ''
            };
          }
        } catch (e) {
          taskData = {
            task: textContent.substring(0, 100) || 'Unknown task',
            category: 'Other',
            metadata: {},
            notes: ''
          };
        }

        // Send progress update
        res.write(`data: ${JSON.stringify({
          type: 'progress',
          current: i + 1,
          total: totalFiles,
          task: {
            fileName: file.originalname,
            ...taskData
          }
        })}\n\n`);

      } catch (error) {
        console.error(`Error processing ${file.originalname}:`, error);
        res.write(`data: ${JSON.stringify({
          type: 'progress',
          current: i + 1,
          total: totalFiles,
          task: {
            fileName: file.originalname,
            task: `Error analyzing ${file.originalname}`,
            category: 'Other',
            metadata: {},
            notes: `Error: ${error.message}`,
            error: true
          }
        })}\n\n`);
      }
    }

    // Send completion signal
    res.write(`data: ${JSON.stringify({
      type: 'complete',
      total: totalFiles
    })}\n\n`);

    res.end();

  } catch (error) {
    console.error('Server error:', error);
    res.write(`data: ${JSON.stringify({
      type: 'error',
      error: error.message
    })}\n\n`);
    res.end();
  }
});

app.listen(port, () => {
  console.log(`✅ ScreenTask server running on http://localhost:${port}`);
  console.log(`📝 API endpoints:`);
  console.log(`   - GET  /`);
  console.log(`   - GET  /api/health`);
  console.log(`   - POST /api/analyze-batch`);
});
