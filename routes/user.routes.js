const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', usersController.create);
router.get('/:id', secureMiddleware.isAuthenticated, usersController.get);
router.put('/:id', secureMiddleware.isAuthenticated, usersController.edit);

module.exports = router;
