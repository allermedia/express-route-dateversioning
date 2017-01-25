const config = require('./config');
const middleware = require('./middleware');


module.exports = middleware;
module.exports.config = config.set;
module.exports.reset = config.reset;
