const mongoose = require('mongoose');

/**
 * Connects to the database using the provided credentials.
 * @function connectDB
 * @param {object} credentials - The credentials for connecting to the database.
 * @param {string} credentials.DATABASE - The database URI.
 * @param {string} credentials.DATABASE_PASSWORD - The password for the database URI.
 * @example

    const credentials = {

    DATABASE: 'mongodb://localhost/mydatabase',

    DATABASE_PASSWORD: 'password123'

    };

    connectDB(credentials);
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
