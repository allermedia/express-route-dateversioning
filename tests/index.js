const express = require('express');
const supertest = require('supertest');
const routes = require('../example/routes');
const version = require('../');


describe('GET /', function() {
  let app;
  before(() => {
    app = express();
    app.use(routes);
  });

  it('should pass request to next middleware when called without apiversion', (done) => {
    supertest(app)
      .get('/')
      .expect(404) // in eaxmple/routes.js, next middleware is 404 handler
      .end(done);
  });

  after(() => {
    version.reset();
  });
});
