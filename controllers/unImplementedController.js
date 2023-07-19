const { sendSuccessResponse } = require('../utils');

const unImplementedYet =
    ({ statusCode = 200, message = 'undefined yet' }) =>
    (req, res, next) => {
        sendSuccessResponse.JSON({ response: res, statusCode, message });
    };

module.exports = {
    unImplementedYet,
};
