const dotenv = require('dotenv');
dotenv.config({ path: './config/config.env' }); // load env vars
const app = require('./app');

// env vars
const { PORT = 5000, NODE_ENV: MODE } = process.env;

// create server
app.listen(PORT, () => {
    console.log(`App is running in ${MODE} mode on port ${PORT}🚀...`);
});
