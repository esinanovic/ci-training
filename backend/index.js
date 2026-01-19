// backend/index.js
const express = require('express');
const db = require('./config/database'); 
const { addition, multiplication } = require('./math');
const cors = require('cors');
app.use(cors());

const app = express();
const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running and listening on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.json({ 
    message: 'API en Docker Compose',
    addition: `3 + 2 = ${addition(3, 2)}`,
    multiplication: `4 * 5 = ${multiplication(4, 5)}`
  });
});


app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.get('/api/status', async (req, res) => {
  try {
    // Utilise db.query au lieu de pool.query
    const dbResult = await db.query('SELECT NOW() as time, version() as version');
    
    res.json({
      status: 'success',
      message: 'API and database are working',
      timestamp: new Date().toISOString(),
      data: {
        environment: process.env.NODE_ENV || 'development',
        database: {
          connected: true,
          time: dbResult.rows[0].time,
          version: dbResult.rows[0].version
        }
      }
    });
    
  } catch (dbError) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: dbError.message, // L'erreur est envoyée au client (ton test JS), pas à la console Docker !
      timestamp: new Date().toISOString()
    });
  }
});


module.exports = app;