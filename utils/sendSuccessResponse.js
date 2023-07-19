/**
 * Sends a JSON response with the specified status code, data, and message.
 * @function JSON
 * @param {object} options - The options for the JSON response.
 * @param {object} options.response - The response object.
 * @param {number} [options.statusCode=200] - The status code for the response.
 * @param {object} [options.data] - The data to be included in the response.
 * @param {string} [options.message] - The message to be included in the response.
 * @param {number} [options.results] - The number of data items in the response.
 * @example
    const options = {
    response: res,
    statusCode: 200,
    data: { name: 'John', age: 30 },
    message: 'Success'
    results: 1
    };
    JSON(options);
*/
const JSON = ({ response, statusCode = 200, data, message, results }) => {
    response.status(statusCode).json({
        success: true,
        message,
        results,
        data,
    });
};

module.exports = {
    JSON,
};
