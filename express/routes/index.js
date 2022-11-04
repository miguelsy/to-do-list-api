var express = require('express');
var router = express.Router();

const db = require('../db/db');
const repository = require('../repositories/main.repository')(db);
const controller = require('../controllers/main.controller')(repository);

/* GET home page. */
router.get('/', controller.getHomePage);

router.get('/tasks', controller.getTasks);
router.get('/tasks/:taskId', controller.getTask);
router.post('/tasks', controller.createTask);
router.patch('/tasks/:taskId', controller.updateTask);
router.delete('/tasks/:taskId', controller.deleteTask);

module.exports = router;