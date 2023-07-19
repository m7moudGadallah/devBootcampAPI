const { Bootcamp } = require('../models');
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

module.exports = {
    getAllBootcamps,
    getBootcamp,
    createBootcamp,
    updateBootcamp,
    deleteBootcamp,
};
