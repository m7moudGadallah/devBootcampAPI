const router = require('express').Router();
const { authController } = require('../controllers');

router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/forgetPassword').post(authController.forgetPassword);

router.route('/resetPassword/:resetToken').post(authController.resetPassword);

router.route('/me').get(authController.protect, authController.getMe);

module.exports = router;
