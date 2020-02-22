const express = require('express');
const router = express.Router();

const advertsController = require('../controllers/adverts.controller');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', advertsController.show);
router.post('/', secureMiddleware.isAuthenticated, advertsController.create);
// router.get('/:id', secureMiddleware.isAuthenticated, advertsController.get);
// router.put('/:id', secureMiddleware.isAuthenticated, advertsController.edit);

module.exports = router;