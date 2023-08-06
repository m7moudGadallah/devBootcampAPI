const express = require('express');
const path = require('path');

module.exports = (app) => {
    // set static folder
    app.use(express.static(path.join(__dirname, '../public')));
};
