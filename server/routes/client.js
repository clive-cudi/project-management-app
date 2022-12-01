const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const ClientController = require('../controllers/client.controller');

router.post('/create', authVerify, ClientController.createClient);

router.post('/add-to-project', authVerify, ClientController.addToProject);

router.post('/remove-from-project', authVerify, ClientController.removeFromProject);

module.exports = router;