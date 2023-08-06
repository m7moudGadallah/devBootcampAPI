const { User } = require('../models');
const CRUDFactory = require('./CRUDFactory');
const factory = new CRUDFactory(User, { docName: 'user' });

/**
 * @route GET /api/v1/users
 * @desc Get all users from the database and send a success response with the users data.
 * @access private
 * @auth ['admin']
 */
const getAllUsers = factory.getAll({ sortByFields: '-createdAt' });

/**
 * @route GET /api/v1/users/:id
 * @desc Get a single user by ID from the database and send a success response with the user data.
 * @access private
 * @auth ['admin']
 */
const getUser = factory.getOne();

/**
 * @route POST /api/v1/users
 * @desc create a User
 * @access private
 * @auth ['admin']
 */
const createUser = factory.createOne();

/**
 * @route PATCH /api/v1/users/:id
 * @desc Update a user by ID in the database and send a success response with the updated user data.
 * @access private
 * @auth ['admin']
 */
const updateUser = factory.updateOne();

/**
 * @route UPDATE /api/v1/users/:id
 * @desc Delete a user by ID from the database and send a success response with a null data.
 * @access private
 * @auth ['admin']
 */
const deleteUser = factory.deleteOne();

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
