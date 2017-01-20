/**
 * Example app for express-route-dateversioning
 */
const express = require('express');
const version = require('../')

let app = express();

// Version root middleware
app.get('/', version({
  '2017-01-18': (req, res, next) => { res.send('new pong'); },
  '2016-10-01': (req, res, next) => { res.send('old ping'); },
}));


// 404 message
app.use((req, res, next) => {
  res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});


// Start the thing up
app.listen(8080, () => {
  console.log('');
  console.log('Listening for port 8080');
});
