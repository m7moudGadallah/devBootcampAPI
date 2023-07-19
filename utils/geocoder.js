const nodeGeocoder = require('node-geocoder');

// env variables
const { GEOCODER_PROVIDER: provider, GEOCODER_API_KEY: apiKey } = process.env;

const options = {
    provider,
    httpAdapter: 'https',
    apiKey,
    formatter: null,
};

const geocoder = nodeGeocoder(options);

module.exports = geocoder;
