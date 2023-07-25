const router = require('express').Router({ mergeParams: true });
const { courseController, authController } = require('../controllers');

router
    .route('/')
    .get(courseController.setBootcampId, courseController.getAllCourses)
    .post(
        authController.protect,
        courseController.setBootcampId,
        courseController.createCourse
    );

router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(authController.protect, courseController.updateCourse)
    .delete(authController.protect, courseController.deleteCourse);

module.exports = router;
