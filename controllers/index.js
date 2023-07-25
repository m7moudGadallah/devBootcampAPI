// load controllers
const unImplementedController = require('./unImplementedController');
const bootcampController = require('./bootcampController');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');
const globalErrorHandler = require('./globalErrorHandler');
const courseController = require('./courseController');
const authController = require('./authController');

module.exports = {
    unImplementedController,
    bootcampController,
    courseController,
    authController,
    errorController: {
        undefinedRoutesHandler,
        globalErrorHandler,
    },
};
