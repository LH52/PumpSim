// ============================================================
// PumpArena Backend Proxy Server
// ============================================================
// This server fetches real data from pump.fun's API and serves
// it to your frontend, bypassing CORS restrictions.
//
// HOW TO RUN:
//   1. Install Node.js from https://nodejs.org (if you don't have it)
//   2. Open terminal in this folder
//   3. Run: npm install express cors node-fetch
//   4. Run: node server.js
//   5. Server starts at http://localhost:3001
//   6. Update the frontend PROXY_URL to http://localhost:3001
//
// For deployment (Render, Railway, Vercel):
//   Just push this file and package.json to your repo
// ============================================================

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all origins (your frontend)
app.use(cors());
app.use(express.json());

// ============================================================
// PUMP.FUN API ENDPOINTS
// ============================================================

// Fetch new coins (recently created)
app.get('/api/coins/new', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://frontend-api-v2.pump.fun/coins/latest?limit=50&offset=0&includeNsfw=false', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching new coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch new coins', details: error.message });
  }
});

// Fetch trending/top coins (king of the hill)
app.get('/api/coins/trending', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://frontend-api-v2.pump.fun/coins/king-of-the-hill?limit=50&offset=0&includeNsfw=false', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching trending coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch trending coins', details: error.message });
  }
});

// Fetch coins about to graduate (final stretch)
app.get('/api/coins/graduating', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://frontend-api-v2.pump.fun/coins/about-to-graduate?limit=50&offset=0&includeNsfw=false', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching graduating coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch graduating coins', details: error.message });
  }
});

// Fetch graduated/migrated coins
app.get('/api/coins/graduated', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://frontend-api-v2.pump.fun/coins/graduated?limit=50&offset=0&includeNsfw=false', {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching graduated coins:', error.message);
    res.status(500).json({ error: 'Failed to fetch graduated coins', details: error.message });
  }
});

// Fetch specific coin details by mint address
app.get('/api/coin/:mint', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const { mint } = req.params;
    const response = await fetch(`https://frontend-api-v2.pump.fun/coins/${mint}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching coin:', error.message);
    res.status(500).json({ error: 'Failed to fetch coin', details: error.message });
  }
});

// Fetch coin trades
app.get('/api/coin/:mint/trades', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const { mint } = req.params;
    const limit = req.query.limit || 50;
    const response = await fetch(`https://frontend-api-v2.pump.fun/coins/${mint}/trades?limit=${limit}&offset=0`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching trades:', error.message);
    res.status(500).json({ error: 'Failed to fetch trades', details: error.message });
  }
});

// Search coins
app.get('/api/search', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const query = req.query.q || '';
    const response = await fetch(`https://frontend-api-v2.pump.fun/coins/search?query=${encodeURIComponent(query)}&limit=20`, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error searching:', error.message);
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
});

// Generic proxy for any pump.fun API path
app.get('/api/proxy/*', async (req, res) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const path = req.params[0];
    const queryString = new URLSearchParams(req.query).toString();
    const url = `https://frontend-api-v2.pump.fun/${path}${queryString ? '?' + queryString : ''}`;
    
    console.log(`Proxying: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json',
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error.message);
    res.status(500).json({ error: 'Proxy failed', details: error.message });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ============================================================
// START SERVER
// ============================================================

app.listen(PORT, () => {
  console.log(`
  ╔══════════════════════════════════════════╗
  ║   ⚡ PumpArena Proxy Server Running     ║
  ║                                          ║
  ║   URL: http://localhost:${PORT}          ║
  ║                                          ║
  ║   Endpoints:                             ║
  ║   GET /api/coins/new                     ║
  ║   GET /api/coins/trending                ║
  ║   GET /api/coins/graduating              ║
  ║   GET /api/coins/graduated               ║
  ║   GET /api/coin/:mint                    ║
  ║   GET /api/coin/:mint/trades             ║
  ║   GET /api/search?q=query                ║
  ║   GET /api/proxy/*                       ║
  ╚══════════════════════════════════════════╝
  `);
});
