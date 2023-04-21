const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const ProjectController = require('../controllers/project.controller');


router.get("/all-projects-id", authVerify, ProjectController.getAllProjects);

router.post("/create", authVerify, ProjectController.createProject);

router.get("/project-by-id", authVerify, ProjectController.getProjectById);

router.get('/projects-multiple-id', authVerify, ProjectController.getProjectsById_multiple);

router.get("/projects-details", authVerify, ProjectController.getAllProjectsDetails);

// adding a contributor
router.post("/individual-contributor", authVerify, ProjectController.addIndividualContributor);

// removing a contributor
router.delete("/individual-contributor", authVerify);

// [TODO]: add project access privileges i.e "admin" | "contributor"


module.exports = router;