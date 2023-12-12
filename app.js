const express = require('express');
const path = require('path');
var morgan = require('morgan');

const port = 3000;
const app = express();
app.use(morgan('tiny')) 

app.use(express.static('public'))
app.use(express.static('public/pages'))
app.use(express.static('public/javascript'))
app.use(express.static('public/css'))

app.get('/', (req, res) => {

  console.log(req);

  res.sendFile("/pages/index.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});