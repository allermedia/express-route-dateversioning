/*
 * Configuration module
 * 
 */
const _ = require('lodash');

// Define default configs
const defaultConfig = {
  queryparam: 'apiversion',
  header: 'apiversion'
};

// Create config object out from default config
let config = _.clone(defaultConfig);


/**
 * Set config
 */
const set = function configSet(opts = {}) {
  config = _.merge({}, config, opts); // Create new config object
};


/**
 * Get config value
 */
const get = function configGet(key) {
  return config[key];
};


/**
 * Reset config to defaults
 */
const reset = function configReset() {
  config = _.clone(defaultConfig);
};


module.exports.set = set;
module.exports.get = get;
module.exports.reset = reset;
