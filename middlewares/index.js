const morgan = require('morgan');

const { NODE_ENV: MODE } = process.env;

module.exports = (app) => {
    // Development logging
    if (MODE === 'development') {
        app.use(morgan('dev'));
    }
};
