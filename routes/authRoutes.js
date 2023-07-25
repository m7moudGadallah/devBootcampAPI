const router = require('express').Router();
const { authController } = require('../controllers');

router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/me').get(authController.protect, authController.getMe);

module.exports = router;
