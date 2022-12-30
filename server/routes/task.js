const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const TaskController = require('../controllers/task.controller');

router.get("/getalltasks", authVerify, TaskController.getAllTasks);

router.post("/add", authVerify, TaskController.createTask);

router.get("/taskbyid/:tid", authVerify, TaskController.getTaskById);

router.post("/getmultipletasks", authVerify, TaskController.getMultipleTasksById);

router.get("/mytasksbyid", authVerify, TaskController.getMyTasksById);

router.delete("/remove/:tid", authVerify, TaskController.removeTask);

router.delete("/delete", authVerify, TaskController.deleteTask);

router.post("/update-status", authVerify, TaskController.updateTaskStatus);

router.post("/update-status-multiple", authVerify, TaskController.updateMultipleTaskStatuses);

router.post("/update-priority", authVerify, TaskController.updateTaskPriority);

router.post("/update-priority-multiple", authVerify, TaskController.updateMultipleTaskPriorities);

router.delete("/delete-multiple", authVerify, TaskController.removeMultiple);

module.exports = router;
