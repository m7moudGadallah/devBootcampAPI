const mongoose = require('mongoose');

/**
 * Connects to a MongoDB database using the provided credentials.
 *
 * @param {object} options - The options for connecting to the database.
 * @param {string} options.DATABASE - The MongoDB URI string for the database.
 * @param {string} options.DATABASE_PASSWORD - The password for the database.
 * @returns {void}
 */
const connectDB = ({ DATABASE, DATABASE_PASSWORD }) => {
    // 1) set password on uri
    const DB = DATABASE.replace('<password>', DATABASE_PASSWORD);

    // 2) connect to db
    mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() =>
            console.log('Database Connected🚀...'.cyan.underline.bold.italic)
        );
};

module.exports = {
    connectDB,
};
