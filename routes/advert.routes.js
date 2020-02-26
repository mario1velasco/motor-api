const express = require('express');
const router = express.Router();

const advertsController = require('../controllers/adverts.controller');
const secureMiddleware = require('../middleware/secure.middleware');



router.get('/', advertsController.get);
router.get('/:id', advertsController.show);
router.post('/', secureMiddleware.isAuthenticated, advertsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, advertsController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, advertsController.destroy);

module.exports = router;