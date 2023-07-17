const unImplementedYet =
    ({ statusCode = 200, message = 'undefined yet' }) =>
    (req, res, next) => {
        res.status(statusCode).json({
            success: true,
            message,
        });
    };

module.exports = {
    unImplementedYet,
};
