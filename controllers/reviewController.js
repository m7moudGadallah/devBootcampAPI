const { Review } = require('../models');
const {catchAsync, AppError} = require('../utils');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(Review, { docName: 'review' });

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
 * @decs Check if user is the owner if this review or not
 */
const checkOwnerShip = catchAsync(async (req, res, next) => {
    // get course
    const review = await Review.findById(req.params.id);

    // check if the user owns this course
    if (
        !(
            req.user.role === 'admin' ||
            review.user.toString() === req.body.user.toString()
        )
    ) {
        return next(
            new AppError(
                `you are not authorized to modify or delete this review`,
                401
            )
        );
    }

    return next();
});

/*------------------------------------(Controllers)------------------------------------*/
/**
 * @route GET /api/v1/reviews
 * @route GET /api/v1/bootcamps/:bootcampId/reviews
 * @desc Get all reviews from the database and send a success response with the reviews data.
 * @access public
 */
const getAllReviews = factory.getAll({
    sortByFields: '-createdAt',
    populates: [
        {
            path: 'bootcamp',
            select: 'name description',
        },
    ],
});

/**
 * @route POST /api/v1/bootcamps/:bootcampId/reviews
 * @desc create a Review
 * @access private
 * @auth ['user']
 */
const createReview = factory.createOne();

/**
 * @route PATCH /api/v1/reviews/:id
 * @desc Update a review by ID in the database and send a success response with the updated review data.
 * @access private
 * @auth ['user']
 */
const updateReview = factory.updateOne();

/**
 * @route DELETE /api/v1/reviews/:id
 * @desc Delete a review by ID from the database and send a success response with a null data.
 * @access private
 * @auth ['admin', 'user']
 */
const deleteReview = factory.deleteOne();

module.exports = {
    setBootcampId,
    setUserId,
    checkOwnerShip,
    getAllReviews,
    createReview,
    updateReview,
    deleteReview,
};
