/**
 * Sends a JSON response with a success status, data, and message.
 *
 * @param {object} options - The options for the response.
 * @param {object} options.response - The HTTP response object.
 * @param {number} [options.statusCode=200] - The HTTP status code for the response (default 200).
 * @param {(Array|object)} [options.data] - The data to be included in the response. This can be any JSON-serializable object.
 * @param {string} [options.message] - An optional message to be included in the response if no 'data' parameter is provided.
 * @returns {void}
 */
const JSON = ({ response, statusCode = 200, data, message }) => {
    response.status(statusCode).json({
        success: true,
        data,
        message,
    });
};

module.exports = {
    JSON,
};
