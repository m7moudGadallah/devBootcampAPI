const router = require('express').Router({ mergeParams: true });
const { courseController } = require('../controllers');

/**
 * @route GET /api/v1/courses
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @desc get all courses
 * @access public
 */
router
    .route('/')
    .get(courseController.setBootcampId, courseController.getAllCourses);

/**
 * @route GET /api/v1/courses/:id
 * @desc get a bootcamp by id
 * @access public
 */
router.route('/:id').get(courseController.getCourse);

/**
 * @route POST /api/v1/courses
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @desc create a Course
 * @access private
 * @auth ['admin']
 */
router
    .route('/')
    .post(courseController.setBootcampId, courseController.createCourse);

/**
 * @route PATCH /api/v1/courses/:id
 * @desc update a Course
 * @access private
 * @auth ['admin']
 */
router.route('/:id').patch(courseController.updateCourse);

/**
 * @route DELETE /api/v1/courses/:id
 * @desc delete a Course
 * @access private
 * @auth ['admin']
 */
router.route('/:id').delete(courseController.deleteCourse);

module.exports = router;
