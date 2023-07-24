const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User should have a name'],
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    role: {
        type: String,
        enum: ['user', 'publisher'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [6, 'Password should be at least 6 characters'],
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
