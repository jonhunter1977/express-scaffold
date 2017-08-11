'use strict';

const express = require('express');

//load middleware
const logger = require('../middleware/logger');

//load routes
const routes = require('../routes');
const routeError = routes.v1.routeError;

const app = express();

//use middleware
app.use(logger);

//use routes
app.use('/', (req, res, next) => {
  next();
});

//error route
app.use(routeError);

module.exports = app;
