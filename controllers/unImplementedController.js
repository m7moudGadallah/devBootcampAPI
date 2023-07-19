const { sendSuccessResponse } = require('../utils');

/**
 * Middleware function to handle unimplemented routes.
 * @function unImplementedYet
 * @param {object} options - The options for the unimplemented route response.
 * @param {number} [options.statusCode=200] - The status code for the response.
 * @param {string} [options.message='undefined yet'] - The message to be included in the response.
 * @returns {function} - Express middleware function that sends a success response with the specified status code and message.
 * @example
    const options = {
    statusCode: 200,
    message: 'Not implemented yet'
    };
    app.get('/unimplemented', unImplementedYet(options));
*/
const unImplementedYet =
    ({ statusCode = 200, message = 'undefined yet' }) =>
    (req, res, next) => {
        sendSuccessResponse.JSON({ response: res, statusCode, message });
    };

module.exports = {
    unImplementedYet,
};
