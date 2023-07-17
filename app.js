const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// mount middelwares
middlewares(app);

// mount routes
routes(app);

module.exports = app;
