const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');
const sessionController = require('../controllers/session.controller');

router.post('/authenticate', sessionController.authenticate);
router.delete('/', secureMiddleware.isAuthenticated, sessionController.destroy);
// router.delete('/', sessionController.destroy);

module.exports = router;
