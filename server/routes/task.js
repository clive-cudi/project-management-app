const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const TaskController = require('../controllers/task.controller');

router.get("/getalltasks", authVerify, TaskController.getAllTasks);

router.post("/add", authVerify, TaskController.createTask);

module.exports = router;