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

router.use(courseController.setUserId);

router
    .route('/:id')
    .patch(courseController.checkOwnerShip, courseController.updateCourse)
    .delete(courseController.checkOwnerShip, courseController.deleteCourse);

module.exports = router;
