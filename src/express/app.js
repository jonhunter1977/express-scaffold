const express = require('express');
const logger = require('./middleware/logger');
const routeError = require('./middleware/route-error');

const app = express();

//middleware
app.use(logger);

//routes
app.use('/', () => {});

//error route
app.use(routeError);

app.listen(4000);
