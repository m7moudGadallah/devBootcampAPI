const router = require('express').Router({ mergeParams: true });
const { courseController, authController } = require('../controllers');

/**
 * @access public
 */
router
    .route('/')
    .get(courseController.setBootcampId, courseController.getAllCourses);

router.route('/:id').get(courseController.getCourse);

/**
 * @access private
 * @auth ['admin', 'publisher']
 */
router.use(
    authController.protect,
    authController.authorize('admin', 'publisher')
);

router
    .route('/')
    .post(
        authController.protect,
        courseController.setBootcampId,
        courseController.createCourse
    );

router
    .route('/:id')
    .patch(authController.protect, courseController.updateCourse)
    .delete(authController.protect, courseController.deleteCourse);

module.exports = router;
