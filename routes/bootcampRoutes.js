const router = require('express').Router();
const { bootcampController } = require('../controllers');
const courseRouter = require('./courseRoutes');

// Nested route middelware to re-route
/**
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @desc get bootcamp courses
 * @access public
 */
router.use('/:bootcampId/courses', courseRouter);

/**
 * @route GET /api/v1/bootcamps
 * @desc get all bootcamps
 * @access public
 */
router.route('/').get(bootcampController.getAllBootcamps);

/**
 * @route GET /api/v1/bootcamps/:id
 * @desc get a bootcamp by id
 * @access public
 */
router.route('/:id').get(bootcampController.getBootcamp);

/**
 * @route POST /api/v1/bootcamps
 * @desc create a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/').post(bootcampController.createBootcamp);

/**
 * @route PATCH /api/v1/bootcamps/:id
 * @desc update a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/:id').patch(bootcampController.updateBootcamp);

/**
 * @route DELETE /api/v1/bootcamps/:id
 * @desc delete a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/:id').delete(bootcampController.deleteBootcamp);

/**
 * @route GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
 * @desc Get bootcamps within a radius
 * @access private
 * @auth all
 */
router
    .route('/radius/:zipcode/:distance/:unit')
    .get(bootcampController.getBootcampsWithinRadius);

module.exports = router;
