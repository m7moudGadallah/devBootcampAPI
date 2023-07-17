module.exports = (app) => {
    // testing route
    app.get('/', (req, res) => {
        res.status(200).json({
            success: 'true',
            messag: 'hell:)',
        });
    });
};
