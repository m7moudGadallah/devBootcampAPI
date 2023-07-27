const router = require('express').Router();
const { authController } = require('../controllers');

/**
 * @access public
 */
router.route('/register').post(authController.register);

router.route('/login').post(authController.login);

router.route('/forgetPassword').post(authController.forgetPassword);

router.route('/resetPassword/:resetToken').post(authController.resetPassword);

/**
 * @access private
 */
router.use(authController.protect);

router.route('/me').get(authController.getMe);
router.route('/updateDetails').patch(authController.updateDetails);

module.exports = router;
