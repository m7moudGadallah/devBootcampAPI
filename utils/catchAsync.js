/**
 * Wraps an asynchronous function with error handling middleware.
 *
 * @param {function} fn - The asynchronous function to be wrapped.
 * @returns {function} A new function that wraps around `fn` and handles any errors that might occur while executing it.
 */
const catchAsync = function (fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
};

module.exports = catchAsync;
