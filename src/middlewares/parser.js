const { json } = require('express');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');

/**
 * Middlewares
 * @middleware body-parser json
 * @middleware cookie-parser
 * @middleware file-upload
 */
const parser = (app) => {
    // body-parser middleware => rendering data from req.body
    app.use(json());

    // cookie-parser
    app.use(cookieParser());

    // File upload
    app.use(fileupload());
};

module.exports = parser;
