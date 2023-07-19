const router = require('express').Router();
const { bootcampController } = require('../controllers');
/**
 * @route GET /api/v1/bootcamps
 * @desc get all bootcamps
 * @access public
 */
router.route('/').get(
    // unImplementedController.unImplementedYet({
    //     message: 'Get all Bootcamps, undefined yet',
    // })
    bootcampController.getAllBootcamps
);

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

module.exports = router;
