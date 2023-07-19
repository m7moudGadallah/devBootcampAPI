// load controllers
const unImplementedController = require('./unImplementedController');
const bootcampController = require('./bootcampController');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');
const globalErrorHandler = require('./globalErrorHandler');

module.exports = {
    unImplementedController,
    bootcampController,
    errorController: {
        undefinedRoutesHandler,
        globalErrorHandler,
    },
};
