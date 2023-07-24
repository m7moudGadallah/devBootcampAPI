const router = require('express').Router();
const { bootcampController } = require('../controllers');
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
    .post(bootcampController.createBootcamp);

router
    .route('/:id')
    .get(bootcampController.getBootcamp)
    .patch(bootcampController.updateBootcamp)
    .delete(bootcampController.deleteBootcamp);

router.route('/:id/photo').put(bootcampController.uploadBootcampPhoto);

router
    .route('/radius/:zipcode/:distance/:unit')
    .get(bootcampController.getBootcampsWithinRadius);

module.exports = router;
