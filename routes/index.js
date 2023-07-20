// load routes
const bootcampRouter = require('./bootcampRoutes');
const courseRouter = require('./courseRoutes');

module.exports = (app) => {
    // testing route
    // app.get('/', (req, res) => {
    //     res.status(200).json({
    //         success: 'true',
    //         messag: 'hell:)',
    //     });
    // });

    app.use('/api/v1/bootcamps', bootcampRouter);
    app.use('/api/v1/courses', courseRouter);
};
