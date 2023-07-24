const { Bootcamp } = require('../models');

// load env values
const { FILE_UPLOAD_PATH: uploadDir, MAX_FILE_UPLOAD: maxFileSize } =
    process.env;

const {
    catchAsync,
    geocoder,
    sendSuccessResponse,
    AppError,
} = require('../utils');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(Bootcamp, { docName: 'bootcamp' });

/**
 * @route GET /api/v1/bootcamps
 * @desc Get all bootcamps from the database and send a success response with the bootcamps data.
 * @access public
 */
const getAllBootcamps = factory.getAll({
    sortByFields: '-createdAt',
    populates: [
        {
            path: 'courses',
            select: '-__v',
        },
    ],
});

/**
 * @route GET /api/v1/bootcamps/:id
 * @desc Get a single bootcamp by ID from the database and send a success response with the bootcamp data.
 * @access public
 */
const getBootcamp = factory.getOne({
    populates: [
        {
            path: 'courses',
            select: '-__v',
        },
    ],
});

/**
 * @route POST /api/v1/bootcamps
 * @desc Create a new bootcamp and send a success response with the created bootcamp data.
 * @access private
 * @auth ['admin']
 */
const createBootcamp = factory.createOne();

/**
 * @route PATCH /api/v1/bootcamps/:id
 * @desc Update a bootcamp by ID in the database and send a success response with the updated bootcamp data.
 * @access private
 * @auth ['admin']
 */
const updateBootcamp = factory.updateOne();

/**
 * @route DELETE /api/v1/bootcamps/:id
 * @desc Delete a bootcamp by ID from the database and send a success response with a null data.
 * @access private
 * @auth ['admin']
 */
const deleteBootcamp = factory.deleteOne();

/**
 * @route GET /api/v1/bootcamps/radius/:zipcode/:distance/:unit
 * @desc Get bootcamps within a specified radius of a given location.
 * @access private
 * @auth all
 *
 * @param {string} req.params.zipcode - The zipcode of the location to search from.
 * @param {number} req.params.distance - The distance in either miles (mi) or kilometers (km) to search within.
 * @param {string} [req.params.unit='mi'] - The unit of distance to use, either 'mi' for miles or 'km' for kilometers.
 */
const getBootcampsWithinRadius = catchAsync(async (req, res, next) => {
    const { zipcode, distance, unit = 'mi' } = req.params;

    // Get lat/lng from gecoder
    const loc = await geocoder.geocode(zipcode);
    const { latitude, longitude } = loc[0];

    // Calc radius using radians
    // Divide distance by radius of Earth
    // Earth Radius = 3,963.2 mi || 6,378.1 km
    const radius = distance / (unit === 'mi' ? 3963.2 : 6378.1);

    const bootcamps = await Bootcamp.find({
        location: {
            $geoWithin: {
                $centerSphere: [[longitude, latitude], radius],
            },
        },
    }).select('-__v');

    // send response
    sendSuccessResponse({ response: res }).JSON({
        count: bootcamps.length,
        data: bootcamps,
    });
});

/**
 * @route PUT /api/v1/bootcamps/:id/photo
 * @desc Upload photo for a bootcamp
 * @access private
 * @auth ['admin']
 */
const uploadBootcampPhoto = catchAsync(async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if (!bootcamp) {
        return next(new AppError(`No bootcamp found with that ID`, 404));
    }

    if (!req.files) {
        return next(new AppError('Please upload a file', 400));
    }

    const file = req.files.photo;

    // Make sure that uploaded file is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new AppError('Please upload an image file', 400));
    }

    // check fileSize
    if (file.size > maxFileSize) {
        return next(
            new AppError(`Please upload an image less than ${maxFileSize}`, 400)
        );
    }
    // get image extension
    const ext = file.mimetype.split('/')[1];

    // create custom filename
    file.name = `photo_${bootcamp._id}_${Date.now()}.${ext}`;

    // save image
    file.mv(`${uploadDir}/${file.name}`, async (err) => {
        if (err) {
            return next(new AppError('Problem with file upload', 500));
        }

        await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

        sendSuccessResponse({ response: res }).JSON({
            data: {
                photo: file.name,
            },
        });
    });
});

module.exports = {
    getAllBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsWithinRadius,
    uploadBootcampPhoto,
};
