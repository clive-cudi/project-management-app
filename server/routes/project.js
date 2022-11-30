const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const ProjectController = require('../controllers/project.controller');


router.get("/all-projects-id", authVerify, ProjectController.getAllProjects);

router.post("/create", authVerify, ProjectController.createProject);

router.post("/project-by-id", authVerify, ProjectController.getProjectById);

router.post('/projects-multiple-id', authVerify, ProjectController.getProjectsById_multiple);

router.post("/projects-details", authVerify, ProjectController.getAllProjectsDetails);


module.exports = router;