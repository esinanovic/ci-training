// backend/index.js
const express = require('express');
const app = express();
const { addition, multiplication } = require('./math');
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


console.log('=== RENDER DEBUG ===');
console.log('Node version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);


module.exports = app;