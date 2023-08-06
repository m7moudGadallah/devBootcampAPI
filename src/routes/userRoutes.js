const router = require('express').Router();
const { userController, authController } = require('../controllers');

/**
 * @access private
 * @auth ['admin']
 */
router.use(authController.protect, authController.authorize('admin'));

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
