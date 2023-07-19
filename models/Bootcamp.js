const mongooes = require('mongoose');
const validator = require('validator');

const BootcampSchema = new mongooes.Schema({
    name: {
        type: String,
        required: [true, 'Bootcamp must have a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Bootcamp should have a description'],
        maxlength: [500, 'Description can not be more than 500 characters'],
    },
    website: {
        type: String,
        // validate it's a correct url format
        validate: [
            validator.isURL,
            'Please use a vaild URL with HTTP or HTTPS',
        ],
    },
    email: {
        type: String,
        // validate it's a correct email format
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    phone: {
        type: String,
        // validate: [validator.isMobilePhone, 'Please provide a valid phone'],
    },
    address: {
        type: String,
        required: [true, 'Bootcamp should have an address'],
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'], // location must be a point
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        // Array of Strings
        type: [String],
        required: [true, 'Bootcamp must have at least one career'],
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other',
        ],
    },
    averageRatings: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must be at most 10'],
        default: 1,
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg',
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGuarantee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
});

const Bootcamp = mongooes.model('Bootcamp', BootcampSchema);

module.exports = Bootcamp;
