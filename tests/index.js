const express = require('express');
const supertest = require('supertest');

let app = express();

app.use(require('../example/routes'));


describe('GET /', function() {
  
  it('should pass request to next middleware when called without apiversion uriparam', function(done) {
    supertest(app)
      .get('/')
      .expect(404) // in eaxmple/routes.js, next middleware is 404 handler
      .end(done);
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
});
