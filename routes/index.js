// load routes
const bootcampRouter = require('./bootcampRoutes');
const courseRouter = require('./courseRoutes');
const authRouter = require('./authRoutes');
const userRouter = require('./userRoutes');
const reviewRouter = require('./reviewRoutes');

module.exports = (app) => {
    app.use('/api/v1/bootcamps', bootcampRouter);
    app.use('/api/v1/courses', courseRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/users', userRouter);
    app.use('/api/v1/reviews', reviewRouter);
};
