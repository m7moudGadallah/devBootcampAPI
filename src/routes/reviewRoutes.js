const router = require('express').Router({ mergeParams: true });
const { reviewController, authController } = require('../controllers');

/**
 * @access public
 */
router
    .route('/')
    .get(reviewController.setBootcampId, reviewController.getAllReviews);

/**
 * @access private
 */
router.use(authController.protect, reviewController.setUserId);

router
    .route('/')
    .post(
        authController.authorize('user'),
        reviewController.setBootcampId,
        reviewController.createReview
    );

router
    .route('/:id')
    .patch(
        authController.authorize('user'),
        reviewController.checkOwnerShip,
        reviewController.updateReview
    )
    .delete(
        authController.authorize('admin', 'user'),
        reviewController.checkOwnerShip,
        reviewController.deleteReview
    );

module.exports = router;
