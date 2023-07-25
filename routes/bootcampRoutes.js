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

router
    .route('/')
    .get(bootcampController.getAllBootcamps)
    .post(authController.protect, bootcampController.createBootcamp);

router
    .route('/:id')
    .get(bootcampController.getBootcamp)
    .patch(authController.protect, bootcampController.updateBootcamp)
    .delete(authController.protect, bootcampController.deleteBootcamp);

router.use(authController.protect);

router.route('/:id/photo').put(bootcampController.uploadBootcampPhoto);

router
    .route('/radius/:zipcode/:distance/:unit')
    .get(bootcampController.getBootcampsWithinRadius);

module.exports = router;
