var express = require('express');
var router = express.Router();
const controller = require('../controllers/main.controller');

/* GET home page. */
router.get('/', controller.getHomePage);

module.exports = router;