const router = require('express').Router({ mergeParams: true });
const { courseController } = require('../controllers');

router
    .route('/')
    .get(courseController.setBootcampId, courseController.getAllCourses)
    .post(courseController.setBootcampId, courseController.createCourse);

router
    .route('/:id')
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;
