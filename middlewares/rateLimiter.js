const rateLimit = require('express-rate-limit');

/**
 * @middleware rate-limit using express-rate-limit
 */
const rateLimiter = (app) => {
    // rate limiting middleware => limit requests from same API
    const limiter = rateLimit({
        max: 100,
        windowMs: 60 * 60 * 1000,
        message: {
            status: 'Error',
            message:
                'Too many requests from this IP, please try again in an hour!',
        },
    });
    app.use('/api', limiter);
};

module.exports = rateLimiter;
