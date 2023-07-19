require('colors'); // colorize logs
const dotenv = require('dotenv');
const { configENV, db } = require('../config');

dotenv.config({ path: configENV }); // load env vars

// load models
const models = require('../models');

// env vars
const { DATABASE, DATABASE_PASSWORD } = process.env;

// connect to database
db.connectDB({ DATABASE, DATABASE_PASSWORD });

// load data
const modelName = process.argv[2][0].toUpperCase() + process.argv[2].slice(1).toLowerCase();
const model = models[modelName];
const fileName = `${modelName.toLowerCase()}s`;
const data = require(`./backup/${fileName}.json`);

// import data on database
const importData = async function () {
    try {
        await model.create(data, { validateBeforeSave: false });
        console.log(
            'Data loaded successfully🎉...'.green.underline.bold.italic
        );
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    } finally {
        process.exit();
    }
};

//delete data
const deleteData = async function () {
    try {
        await model.deleteMany();
        console.log(
            'Data deleted successfully🎉...'.green.underline.bold.italic
        );
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    } finally {
        process.exit();
    }
};

// check passed option
if (process.argv[3] === '--import' || process.argv[3] === '-i') {
    importData();
} else if (process.argv[3] === '--delete' || process.argv[3] === '-d') {
    deleteData();
} else {
    console.log(`Error💥, undefined command`.red.underline.bold.italic);
}

/*
    How to execute script?
    
    1) importing: node seeder.js {model} (--import  OR -i)
    2) clear: node seeder.js {model} (--delete OR -d)
*/
