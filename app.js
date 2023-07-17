const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// middelwares
middlewares(app);

// routes
routes(app);

module.exports = app;
