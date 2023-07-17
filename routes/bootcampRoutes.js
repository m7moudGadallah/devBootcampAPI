const router = require('express').Router();
const { unImplementedController } = require('../controllers');
/**
 * @route GET /api/v1/bootcamps
 * @desc get all bootcamps
 * @access public
 */
router.route('/').get(
    unImplementedController.unImplementedYet({
        message: 'Get all Bootcamps, undefined yet',
    })
);

/**
 * @route GET /api/v1/bootcamps/:id
 * @desc get a bootcamp by id
 * @access public
 */
router.route('/:id').get(
    unImplementedController.unImplementedYet({
        message: 'Get a Bootcamp, undefined yet',
    })
);

/**
 * @route POST /api/v1/bootcamps
 * @desc create a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/').post(
    unImplementedController.unImplementedYet({
        statusCode: 201,
        message: 'Create a Bootcamp, undefined yet',
    })
);

/**
 * @route PATCH /api/v1/bootcamps/:id
 * @desc update a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/:id').patch(
    unImplementedController.unImplementedYet({
        message: 'Update a Bootcamp, undefined yet',
    })
);

/**
 * @route DELETE /api/v1/bootcamps/:id
 * @desc delete a bootcamp
 * @access private
 * @auth ['admin']
 */
router.route('/:id').delete(
    unImplementedController.unImplementedYet({
        message: 'Delete a Bootcamp, undefined yet',
    })
);

module.exports = router;
