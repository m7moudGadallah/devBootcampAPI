const { Course } = require('../models');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(Course, { docName: 'course' });

const setBootcampId = (req, res, next) => {
    if (req.params?.bootcampId) {
        req.query.bootcamp = req.params.bootcampId;
        req.body.bootcamp = req.params.bootcampId;
    }

    next();
};

/**
 * Get all courses from the database and send a success response with the courses data.
 */
const getAllCourses = factory.getAll({ sortByFields: '-createdAt' });

/**
 * Get a single course by ID from the database and send a success response with the course data.
 */
const getCourse = factory.getOne({
    populates: [
        {
            path: 'bootcamp',
            select: 'name description',
        },
    ],
});

/**
 * Create a new course and send a success response with the created course data.
 */
const createCourse = factory.createOne();

/**
 * Update a course by ID in the database and send a success response with the updated course data.
 */
const updateCourse = factory.updateOne();

/**
 * Delete a course by ID from the database and send a success response with a null data.
 */
const deleteCourse = factory.deleteOne();

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    setBootcampId,
};
