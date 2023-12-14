const express = require('express');
const path = require('path');
var morgan = require('morgan');
// const addCheck = require('./public/javascript/addCheckUser.js');
const addCheckUser = require('./public/javascript/addCheckUser.js');


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

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/home.html'));
});

app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/search.html'));
});

app.get('/bookshelves', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/bookshelves.html'));
});

app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/details.html'));
});

app.get('/account', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/pages/account.html'));
});


app.get('/checkAndAddUser', async (req, res) => {
  addCheckUser.checkAndAddUser(); 
  res.send('Check and add user completed.');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


console.log("In app.js");
