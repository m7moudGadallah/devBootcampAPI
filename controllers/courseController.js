const { Course } = require('../models');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(Course, { docName: 'course' });

/**
 * @route GET /api/v1/courses
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @desc Middleware that used to Set bootcampId in request query before calling controller
 * @access public
 */
const setBootcampId = (req, res, next) => {
    if (req.params?.bootcampId) {
        req.query.bootcamp = req.params.bootcampId;
        req.body.bootcamp = req.params.bootcampId;
    }

    next();
};

/**
 * @route GET /api/v1/courses
 * @route GET /api/v1/bootcamps/:bootcampId/courses
 * @desc Get all courses from the database and send a success response with the courses data.
 * @access public
 */
const getAllCourses = factory.getAll({ sortByFields: '-createdAt' });

/**
 * @route GET /api/v1/courses/:id
 * @desc Get a single course by ID from the database and send a success response with the course data.
 * @access public
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
 * @route POST /api/v1/courses
 * @route POST /api/v1/bootcamps/:bootcampId/courses
 * @desc create a Course
 * @access private
 * @auth ['admin', 'publisher']
 */
const createCourse = factory.createOne();

/**
 * @route PATCH /api/v1/courses/:id
 * @desc Update a course by ID in the database and send a success response with the updated course data.
 * @access private
 * @auth ['admin', 'publisher']
 */
const updateCourse = factory.updateOne();

/**
 * @route DELETE /api/v1/courses/:id
 * @desc Delete a course by ID from the database and send a success response with a null data.
 * @access private
 * @auth ['admin', 'publisher']
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
