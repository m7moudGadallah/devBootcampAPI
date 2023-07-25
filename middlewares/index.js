const devLogger = require('./devLogger');
const parser = require('./parser');
const error = require('./error');
const statics = require('./statics');

module.exports = (app) => {
    return {
        /**
         * Middlewares before routes
         * @middleware devLogger => Development logging
         * @middleware parser => body-parser, upload file, cookie-parser
         * @middleware statics => set statitc folder
         */
        pre() {
            // Development logging
            devLogger(app);

            // body-parser middleware
            parser(app);

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
