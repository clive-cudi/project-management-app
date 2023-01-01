const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const ClientController = require('../controllers/client.controller');

router.post('/create', authVerify, ClientController.createClient);

router.post('/add-to-project', authVerify, ClientController.addToProject);

router.post('/remove-from-project', authVerify, ClientController.removeFromProject);

router.post('/client-info', authVerify, ClientController.getClientInfo);

router.post('/multiple-client-info', authVerify, ClientController.getMultipleClientsInfo);

module.exports = router;