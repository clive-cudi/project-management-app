const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const TeamsController = require('../controllers/teams.controller');
const orgAuthVerify = require('../middleware/org_auth');


router.post('/create', authVerify, orgAuthVerify, TeamsController.createTeam);

router.post("/add-members", authVerify, orgAuthVerify, TeamsController.addTeamMembers);

router.post("/remove-members", authVerify, orgAuthVerify, TeamsController.removeTeamMembers);

router.post("/team-by-id", authVerify, TeamsController.getTeam);

router.post("/member-teams", authVerify, TeamsController.getMemberTeams);

module.exports = router;
