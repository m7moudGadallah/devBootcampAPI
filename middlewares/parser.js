const { json } = require('express');
const fileupload = require('express-fileupload');

/**
 * Middlewares
 * @middlware body-parser json
 */
const parser = (app) => {
    // body-parser middleware => rendering data from req.body
    app.use(json());

    // File upload
    app.use(fileupload());
};

module.exports = parser;
