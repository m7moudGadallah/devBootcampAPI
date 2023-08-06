const router = require('express').Router();
const { bootcampController, authController } = require('../controllers');
const courseRouter = require('./courseRoutes');
const reviewRouter = require('./reviewRoutes');

// Nested route middelware to re-route
/**
 * @route /api/v1/bootcamps/:bootcampId/courses
 * @desc access bootcamp courses
 * @access public
 */
router.use('/:bootcampId/courses', courseRouter);

/**
 * @route /api/v1/bootcamps/:bootcampId/reviews
 * @desc access bootcamp reviews
 * @access public
 */
router.use('/:bootcampId/reviews', reviewRouter);

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
