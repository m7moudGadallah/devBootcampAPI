const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A User should have a name'],
    },
    email: {
        type: String,
        validate: [validator.isEmail, 'Please provide a valid email'],
        lowercase: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'publisher', 'admin'],
        default: 'user',
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: [8, 'Password should be 8 character or more'],
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, 'please confirm your password'],
        minLength: [8, 'Password should be 8 character or more'],
        validate: {
            // this only works on CREATE or SAVE
            validator: function (val) {
                return this.password === val;
            },
            message: 'passwords are not the same',
        },
        select: false,
    },
    passwordChangedAt: {
        type: Date,
        select: false,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

// document middelware that hashes password and delete passwordConfirm and set passwordChangedAt if password changed
UserSchema.pre('save', async function (next) {
    // only run this funciton when password is modified
    if (!this.isModified('password')) {
        return next();
    }

    // hash password with cost 12
    this.password = await bcrypt.hash(this.password, 12);

    // remove passwordConfirm field before save document
    this.passwordConfirm = undefined;

    // if it's not a new document then we will set passwordChangedAt
    if (!this.isNew) {
        this.passwordChangedAt = Date.now() - 1000;
    }

    return next();
});

// remove some fields from doc that retrieved after saving
UserSchema.post('save', function () {
    this.password = undefined;
    this.__v = undefined;
    this.createdAt = undefined;
});

// create sign jwt token
UserSchema.methods.getSignedJwtToken = function () {
    const { JWT_SECRET: secret, JWT_EXPIRES_IN: expiresIn } = process.env;

    return jwt.sign({ id: this._id }, secret, { expiresIn });
};

// match that user login password is correct
UserSchema.methods.matchPassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.isPasswordChangedAfter = function (timestamp) {
    const changeToTimeStamp = (date) => parseInt(date.getTime() / 1000, 10);

    if (this.passwordChangedAt) {
        return timestamp < changeToTimeStamp(this.passwordChangedAt);
    }

    return false;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
