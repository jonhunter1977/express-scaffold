'use strict';

const request = require('supertest');
const should = require('should');
const express = require('express');

const routeError = require('../../../src/express/routes/route-error.js');
const RouteErrorObject = require('../../../src/express/objects/route-error.js');

describe('Route error', () => {

  let app;

  afterEach(() => {
    app = null;
  });

  const setUpApp = (mockErrorRoute) => {
    app = express();
    app.all('/', mockErrorRoute);
    app.use(routeError);
  };

  let mockRouteThatErrored;

  it('should return default values if there is no error object', (done) => {

    mockRouteThatErrored = (req, res, next) => {
      const err = {};
      return next(err);
    };

    setUpApp(mockRouteThatErrored);

    request(app)
      .get('/')
      .expect(500)
      .expect((response) => {
        should.equal(response.text, 'Oops something went wrong');
      })
      .end(done);
  });

  it('should return the set values if there is an error object', (done) => {

    mockRouteThatErrored = (req, res, next) => {
      return next(new RouteErrorObject(403,'Forbidden'));
    };

    setUpApp(mockRouteThatErrored);

    request(app)
      .get('/')
      .expect(403)
      .expect((response) => {
        should.equal(response.text, 'Forbidden');
      })
      .end(done);
  });

});
