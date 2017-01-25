/**
 * Example app for express-route-dateversioning
 * 
 */
const express = require('express');
const routes = require('./routes');

let app = express();
app.use(routes);


// Start the thing up
app.listen(8080, () => {
  console.log('');
  console.log('Listening for port 8080');
});
