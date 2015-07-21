express = require('express');
imap = require('./imap');

var app = express();

imap.start();

app.listen(4242);

console.log('App is running.');