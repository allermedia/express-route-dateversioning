/**
 * Separate routes file for example and tests
 * 
 */
const router = require('express').Router();
const version = require('../');


// Version root middleware
router.get('/', version({
  '2017-01-18': (req, res) => { res.send('new pong'); },
  '2016-10-01': (req, res) => { res.send('old ping'); },
}));


// 404 message
router.use((req, res) => {
  res.status(404).send('Page not found');
});


// Error handler
// (ignore 'defined but not used' jshint error since express error handler requires 4 parameters)
router.use((err, req, res, next) => { // jshint ignore:line
  res.status(err.status || 500).send(err.message);
});


module.exports = router;
