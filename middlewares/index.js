const morgan = require('morgan');
const { json } = require('express');

const { NODE_ENV: MODE } = process.env;

module.exports = (app) => {
    // Development logging
    if (MODE === 'development') {
        app.use(morgan('dev'));
    }

    // body-parser middleware => rendering data from req.body
    app.use(json());
};
