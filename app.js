const express = require('express');
const path = require('path');
var morgan = require('morgan');
const addCheck = require('./public/javascript/addCheckUser.js');

const port = 3000;
const app = express();
app.use(morgan('tiny'))

app.use(express.static('public'))
app.use(express.static('public/pages'))
app.use(express.static('public/javascript'))
app.use(express.static('public/styles'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/signin.html'));
});

app.get('/widget', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/widget.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/signin.html'));
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


console.log("In app.js");
