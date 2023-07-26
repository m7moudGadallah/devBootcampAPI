const router = require('express').Router();
const { bootcampController, authController } = require('../controllers');
const courseRouter = require('./courseRoutes');

// Nested route middelware to re-route
/**
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @desc access bootcamp courses
 * @access public
 */
router.use('/:bootcampId/courses', courseRouter);

/**
 * @access public
 */
router.route('/').get(bootcampController.getAllBootcamps);
router.route('/:id').get(bootcampController.getBootcamp);

/**
 * @access private
 */
router.use(authController.protect);

router
    .route('/radius/:zipcode/:distance/:unit')
    .get(bootcampController.getBootcampsWithinRadius);

/**
 * @auth ['admin', 'publisher']
 */
router.use(authController.authorize('admin', 'publisher'));

router.route('/').post(bootcampController.createBootcamp);

router.use(bootcampController.setUserId);

router
    .route('/:id')
    .patch(bootcampController.checkOwnerShip, bootcampController.updateBootcamp)
    .delete(
        bootcampController.checkOwnerShip,
        bootcampController.deleteBootcamp
    );

router
    .route('/:id/photo')
    .put(
        bootcampController.checkOwnerShip,
        bootcampController.uploadBootcampPhoto
    );

module.exports = router;
