const morgan = require('morgan');
const { json } = require('express');

const { NODE_ENV: MODE } = process.env;

module.exports = (app) => {
    return {
        /**
         * Middlewares
         * @middleware Development logging
         * @middleware body-parser
         */
        pre() {
            // Development logging
            if (MODE === 'development') {
                app.use(morgan('dev'));
            }

            // body-parser middleware => rendering data from req.body
            app.use(json());
        },

        /**
         * Middlewares
         * @middleware global error
         */
        post() {
            // global error
            app.use((err, req, res, next) => {
                res.status(err.statusCode || 500).json({
                    success: false,
                    error: err,
                    message: err.message,
                    stack: err.stack,
                });
            });
        },
    };
};
