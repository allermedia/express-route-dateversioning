const express = require('express');
const supertest = require('supertest');
const routes = require('../example/routes');
const version = require('../');


describe('GET / with queryparam', function() {
  let app;
  before(() => {
    app = express();
    app.use(routes);
  });

  it('should respond with 400 error when requesting non-matching version', function(done) {
    supertest(app)
      .get('/?apiversion=1900-01-01')
      .expect(400)
      .end(done);
  });

  it('should respond with 400 error when bad version is requested', function(done) {
    supertest(app)
      .get('/?apiversion=asdasdasd-01-01')
      .expect(400)
      .end(done);
  });

  it('should respond with "old ping" when old route is requested', function(done) {
    supertest(app)
      .get('/?apiversion=2017-01-01')
      .expect(200)
      .expect('old ping', done);
  });

  it('should respond with "new pong" when new route is requested', function(done) {
    supertest(app)
      .get('/?apiversion=2017-01-20')
      .expect(200)
      .expect('new pong', done);
  });

  after(() => {
    version.reset();
  });
});