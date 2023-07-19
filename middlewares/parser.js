const { json } = require('express');

/**
 * Middlewares
 * @middlware body-parser json
 */
const parser = (app) => {
    // body-parser middleware => rendering data from req.body
    app.use(json());
};

module.exports = parser;