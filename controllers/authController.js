const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { User } = require('../models');
const {
    catchAsync,
    AppError,
    sendSuccessResponse,
    sendEmail,
} = require('../utils');

/*------------------------------(middlewares)------------------------------*/
/**
 * @middleware Check Authentication of user before accessing resourses
 */
const protect = catchAsync(async (req, res, next) => {
    // 1) Check if there is a token
    if (
        (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer')) &&
        !req.cookies.jwt
    ) {
        return next(
            new AppError(
                'Authorization needed, You are not logged in! Please login to get access',
                401
            )
        );
    }

    const token = req.cookies.jwt || req.headers.authorization.split(' ')[1];

    // 2) Verification token
    const { JWT_SECRET: secret } = process.env;
    const decoded = await promisify(jwt.verify)(token, secret);

    // 3) check if user is still exist
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(
            new AppError(
                'The token belonging to this user does no longer exist.',
                401
            )
        );
    }

    // check if user changed his password after token is issued
    if (user.isPasswordChangedAfter(decoded.iat)) {
        return next(
            new AppError(
                'User recently changed password! please log in again.',
                401
            )
        );
    }

    // 5) GRANT Access to protect route
    user.__v = undefined;
    req.user = user;

    next();
});

/**
 * @middleware Authorize user before accessing resourses
 */
const authorize = function (...roles) {
    return function (req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError(
                    `You don't have a permission to perform this actoin`,
                    403
                )
            );
        }

        return next();
    };
};

/*------------------------------(controllers)------------------------------*/
/**
 * @route POST /api/v1/auth/register
 * @desc Register new user
 * @access public
 */
const register = catchAsync(async (req, res, next) => {
    // Get user data from req body
    const { name, email, password, passwordConfirm, role } = req.body;

    // Create User
    const user = await User.create({
        name,
        email,
        password,
        passwordConfirm,
        role,
    });

    // Create token
    const token = user.getSignedJwtToken();

    sendSuccessResponse({ response: res })
        .attachTokenCookie(token)
        .JSON({ token });
});

/**
 * @route POST /api/v1/auth/login
 * @desc Log user in
 * @access public
 */
const login = catchAsync(async (req, res, next) => {
    // validate that [email, password] have been sent
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('require email and password', 400));
    }

    // validate that there is a user with this email
    const user = await User.findOne({ email });

    if (!user) {
        // check if password is correct
        const isCorrect = await user.matchPassword(password);

        if (!isCorrect) {
            return next(new AppError('Incorrect email or password', 401));
        }
    }

    // create and send token
    const token = user.getSignedJwtToken();

    user.__v = undefined;

    sendSuccessResponse({ response: res })
        .attachTokenCookie(token)
        .JSON({ token });
});

/**
 * @route POST /api/v1/auth/forgetPassword
 * @desc Forget Password
 * @access public
 */
const forgetPassword = catchAsync(async (req, res, next) => {
    // Check if email is already posted
    const { email } = req.body;

    if (!email) {
        return next(new AppError('Please provide email', 400));
    }

    // Get user of posted email and check if this user already exist
    const user = await User.findOne({ email });

    if (!user) {
        return next(new AppError('There is no user with this email', 404));
    }

    // Generate random token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // send email to user with token
    try {
        // create reset link
        const resetURL = `${req.protocol}://${req.get(
            'host'
        )}/api/v1/auth/resetPassword/${resetToken}`;

        // create message
        const message = `Your are receiving this email because you (or someone else) asked to reset password.\nSubmit your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

        // call sendEmail
        //BUG: Socket Error because port is refused from firewall
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        });

        // send response that email is sent
        sendSuccessResponse({ response: res }).JSON({
            data: { message: 'Token sent to email!' },
        });
    } catch (err) {
        // rollback changes
        // console.log(err);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(
            new AppError(
                'There was an error Sending the email. Try again later!',
                500
            )
        );
    }
});

/**
 * @route GET /api/v1/auth/me
 * @desc GET logged in user data
 * @access public
 */
const getMe = catchAsync(async (req, res, next) => {
    sendSuccessResponse({ response: res }).JSON({ data: req.user });
});

module.exports = {
    register,
    login,
    protect,
    authorize,
    getMe,
    forgetPassword,
};
