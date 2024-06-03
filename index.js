const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
    res.send("Welcome to the start 2")
});

app.listen(port, () => {
  console.log(`Proxy server listening at ${port}`);
});
