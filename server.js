const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 4200;

const distDir = path.join(__dirname, 'dist');

app.use(express.static(distDir));

app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(port, process.env.HOST || '0.0.0.0', () => {
  console.log(`Frontend server listening on port ${port}`);
});
