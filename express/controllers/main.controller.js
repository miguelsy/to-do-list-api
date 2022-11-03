const repo = require('../repositories/main.repository');

const controller = {
    getHomePage: function(req, res) {
        res.json('Welcome!');
    }
};

module.exports = controller;