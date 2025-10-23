const express = require('express');
const app = express();
const config = require('./config');

app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.listen(config.PORT, () => {
  console.log(`Test server running on port ${config.PORT}`);
});
