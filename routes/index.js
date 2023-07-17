// load routes
const bootcampRouter = require('./bootcampRoutes');

module.exports = (app) => {
    // testing route
    // app.get('/', (req, res) => {
    //     res.status(200).json({
    //         success: 'true',
    //         messag: 'hell:)',
    //     });
    // });

    app.use('/api/v1/bootcamps', bootcampRouter);
};
