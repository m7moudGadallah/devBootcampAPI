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

// import data on database
const importData = async function (modelName) {
    const model = models[modelName];
    const fileName = `${modelName.toLowerCase()}s`;
    const data = require(`./backup/${fileName}.json`);

    try {
        await model.create(data, { validateBeforeSave: false });
        console.log(
            `${modelName}s loaded successfully🎉...`.green.underline.bold.italic
        );
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    }
};

//delete data
const deleteData = async function (modelName) {
    try {
        const model = models[modelName];
        await model.deleteMany();
        console.log(
            `${modelName}s deleted successfully🎉...`.green.underline.bold
                .italic
        );
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    }
};

const loadAll = async function () {
    try {
        for (const modelName of Object.keys(models)) {
            await importData(modelName);
        }
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    }
};

const deleteAll = async function () {
    try {
        for (const modelName of Object.keys(models)) {
            await deleteData(modelName);
        }
    } catch (err) {
        console.log(`Error💥, ${err.message}`.red.underline.bold.italic);
    }
};

// check passed option
(async () => {
    if (process.argv.length <= 4) {
        if (process.argv[2] === '--import' || process.argv[2] === 'i') {
            if (process.argv.length >= 4) {
                const modelName =
                    process.argv[3][0].toUpperCase() +
                    process.argv[3].slice(1).toLowerCase();
                await importData(modelName);
            } else {
                await loadAll();
            }
        } else if (process.argv[2] === '--delete' || process.argv[2] === 'd') {
            if (process.argv.length >= 4) {
                const modelName =
                    process.argv[3][0].toUpperCase() +
                    process.argv[3].slice(1).toLowerCase();
                await deleteData(modelName);
            } else {
                await deleteAll();
            }
        }
    } else {
        console.log(`Error💥, undefined command`.red.underline.bold.italic);
    }
    process.exit();
})();

/*
    How to execute script?
    
    run: node seeder.js

    options:
    1) import all: [i]
    2) delete all: [d]
    3) import model: [i {modelName}]
    4) delete model: [d {modelName}]
*/
