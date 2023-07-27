const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

/**
 * Middlewares
 * @middleware mongoSanitize
 * @middleware xss
 */
const sanitize = (app) => {
    // Data sanitization against NoSQL query injection
    app.use(mongoSanitize());

    // Data sanitization against XSS
    app.use(xss());
};

module.exports = sanitize;
