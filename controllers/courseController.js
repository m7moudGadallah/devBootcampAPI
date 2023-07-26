const { Course } = require('../models');
const { catchAsync, AppError } = require('../utils');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(Course, { docName: 'course' });

/*------------------------------------(Middlewares)------------------------------------*/
/**
 * @middleware setBootcampId
 * @desc used to Set bootcampId in request query before calling controller
 */
const setBootcampId = (req, res, next) => {
    if (req.params?.bootcampId) {
        req.query.bootcamp = req.params.bootcampId;
        req.body.bootcamp = req.params.bootcampId;
    }

    next();
};

/**
 * @middleware setUserId
 * @decs Set use id in req body
 */
const setUserId = (req, res, next) => {
    req.body.user = req.user._id;
    next();
};

/**
 * @middleware ownerShip
 * @decs Check if user is the owner if this course or not
 */
const checkOwnerShip = catchAsync(async (req, res, next) => {
    // get course
    const course = await Course.findById(req.params.id);

    // check if the user owns this course
    if (
        !(
            req.user.role === 'admin' ||
            course.user.toString() === req.body.user.toString()
        )
    ) {
        return next(
            new AppError(
                `you are not authorized to modify or delete this course`,
                401
            )
        );
    }

    return next();
});

/*------------------------------------(Controllers)------------------------------------*/
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
    setUserId,
    checkOwnerShip,
};
