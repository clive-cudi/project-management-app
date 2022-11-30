const router = require('express').Router();
const authVerify = require('../middleware/auth_verify');
const ClientController = require('../controllers/client.controller');

router.post('/create', authVerify, ClientController.createClient);

module.exports = router;