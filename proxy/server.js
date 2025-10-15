// Minimal status proxy for Minecraft (or any) server status
// Usage:
//   UPSTREAM_STATUS_URL=https://your-upstream.example.com/status node server.js
// Expected upstream response shape: { online: boolean, players:{online,max}, motd: string }
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;
const UPSTREAM = process.env.UPSTREAM_STATUS_URL || '';

app.use(cors({ origin: '*' }));

app.get('/api/status', async (req,res) => {
  try{
    if(!UPSTREAM) return res.status(200).json({ online:false, players:{online:0,max:0}, motd:'(no upstream configured)' });
    const r = await fetch(UPSTREAM, { cache: 'no-store' });
    const data = await r.json();
    res.json(data);
  }catch(e){
    res.status(200).json({ online:false, players:{online:0,max:0}, motd:'unavailable' });
  }
});

app.get('/', (_,res)=> res.type('text').send('Status proxy is running. Use /api/status'));

app.listen(PORT, ()=> console.log('Proxy listening on', PORT));
