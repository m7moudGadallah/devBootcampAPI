// load controllers
const unImplementedController = require('./unImplementedController');
const bootcampController = require('./bootcampController');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');
const globalErrorHandler = require('./globalErrorHandler');
const courseController = require('./courseController');

module.exports = {
    unImplementedController,
    bootcampController,
    courseController,
    errorController: {
        undefinedRoutesHandler,
        globalErrorHandler,
    },
};
