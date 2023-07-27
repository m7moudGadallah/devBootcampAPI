const helmet = require('helmet');
const devLogger = require('./devLogger');
const parser = require('./parser');
const error = require('./error');
const statics = require('./statics');
const sanitizer = require('./sanitizer');
const rateLimiter = require('./rateLimiter');
const hpp = require('hpp');
const cors = require('cors');

module.exports = (app) => {
    return {
        /**
         * Middlewares before routes
         * @middleware helmet => setting security http headers
         * @middleware devLogger => Development logging
         * @middleware parser => body-parser, upload file, cookie-parser
         * @middleware rateLimiter => to limit requests from the same id in period of time
         * @middleware sanitizer => sanitize-data (NoSQL Injection, Data sanitization against XSS)
         * @middleware hpp => prevent parameter pollution
         * @middleware cors => Enable Cross-Origin Resource Sharing
         * @middleware statics => set statitc folder
         */
        pre() {
            // setting security http headers
            app.use(helmet());

            // Development logging
            devLogger(app);

            // body-parser middleware
            parser(app);

            //rateLimit
            rateLimiter(app);

            // sanitize-data
            sanitizer(app);

            // prevent parameter pollution
            app.use(hpp());

            // enable CORS
            app.use(cors());

            // static files
            statics(app);
        },

        /**
         * Middlewares after routes
         * @middleware error => [undefinedRoutes, globalMiddleware]
         */
        post() {
            // handles [undefinedRoutes, globalErrors]
            error(app);
        },
    };
};
