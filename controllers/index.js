// load controllers
const unImplementedController = require('./unImplementedController');
const bootcampController = require('./bootcampController');
const undefinedRoutesHandler = require('./undefinedRoutesHandler');
const globalErrorHandler = require('./globalErrorHandler');
const courseController = require('./courseController');
const authController = require('./authController');
const userController = require('./userController');

module.exports = {
    unImplementedController,
    bootcampController,
    courseController,
    authController,
    userController,
    errorController: {
        undefinedRoutesHandler,
        globalErrorHandler,
    },
};
