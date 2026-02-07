# ⚡ PumpArena — Paper Trading Simulator

## What You Get

### 1. `pumpfun-paper-trader.html` — The Frontend
A fully working paper trading platform that runs in your browser. Currently uses **simulated coins** that mimic real pump.fun behavior:
- 65+ coins with realistic price movements
- New coins appearing every 8-20 seconds  
- Bonding curve progress tracking
- Filtering: New Pairs / Final Stretch / Migrated
- Buy/Sell with $10,000 virtual balance
- Portfolio tracking with P&L
- Leaderboard for multiple users
- Chart.js price charts

**To use right now:** Just open the HTML file in your browser!

---

### 2. `server.js` — Backend Proxy (for REAL pump.fun data)
A Node.js server that fetches actual pump.fun data and serves it to your frontend.

#### Setup Steps:
```bash
# 1. Install Node.js from https://nodejs.org

# 2. In the project folder, install dependencies:
npm install

# 3. Start the proxy server:
node server.js

# Server runs at http://localhost:3001
```

#### Next Step — Connect Frontend to Real Data:
Once the proxy is running, you'll need to update the frontend to fetch from `http://localhost:3001/api/coins/new` etc. instead of using simulated data. I can help you wire this up in the next iteration!

---

## Deployment Options

### Frontend
- **Vercel/Netlify**: Upload the HTML file
- **GitHub Pages**: Push to a repo, enable Pages

### Backend (Proxy Server)
- **Railway.app**: Free tier, push server.js + package.json
- **Render.com**: Free tier, auto-deploys from GitHub
- **Vercel**: Add as serverless functions

---

## Roadmap
- [ ] Wire frontend to real pump.fun API via proxy
- [ ] Add WebSocket for real-time price streaming
- [ ] Token images from pump.fun
- [ ] Persistent leaderboard (database)
- [ ] Social features (share trades)
- [ ] Mobile responsive improvements
