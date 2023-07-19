const { Bootcamp } = require('../models');
const { catchAsync, geocoder, sendSuccessResponse } = require('../utils');
const CRUDFactory = require('./CRUDFactory');
const factory = CRUDFactory({ model: Bootcamp, docName: 'bootcamp' });

/**
 * Get all bootcamps from the database and send a success response with the bootcamps data.
 */
const getAllBootcamps = factory.getAll({});

/**
 * Get a single bootcamp by ID from the database and send a success response with the bootcamp data.
 */
const getBootcamp = factory.getOne({});

/**
 * Create a new bootcamp and send a success response with the created bootcamp data.
 */
const createBootcamp = factory.createOne();

/**
 * Update a bootcamp by ID in the database and send a success response with the updated bootcamp data.
 */
const updateBootcamp = factory.updateOne();

/**
 * Delete a bootcamp by ID from the database and send a success response with a null data.
 */
const deleteBootcamp = factory.deleteOne();

/**
 * Get bootcamps within a specified radius of a given location.
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
    sendSuccessResponse.JSON({
        response: res,
        count: bootcamps.length,
        data: bootcamps,
    });
});

module.exports = {
    getAllBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
    getBootcampsWithinRadius,
};
