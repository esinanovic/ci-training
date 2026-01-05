// backend/index.js
const express = require('express');
const app = express();
const { addition, multiplication } = require('./math');

app.get('/', (req, res) => {
  res.json({ 
    message: 'API en Docker Compose',
    addition: `3 + 2 = ${addition(3, 2)}`,
    multiplication: `4 * 5 = ${multiplication(4, 5)}`
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});


app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


module.exports = app;