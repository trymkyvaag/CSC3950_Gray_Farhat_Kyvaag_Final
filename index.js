const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

app.use(express.static('public'))
app.use(express.static('public/pages'))
app.use(express.static('public/javascript'))
app.use(express.static('public/css'))

app.get('/', (req, res) => {
  res.sendFile("/pages/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});