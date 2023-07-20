const mongooes = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const { geocoder } = require('../utils');

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

// create bootcamp slug from name
BootcampSchema.pre('save', function (next) {
    // this points to query document
    this.slug = slugify(this.name, { lower: true });
    next();
});

// update bootcamp slug when name is updated
BootcampSchema.pre('findOneAndUpdate', function (next) {
    // this points to query object, not the document
    const updateFields = this.getUpdate();

    if (updateFields.name) {
        updateFields.slug = slugify(updateFields.name, { lower: true });
    }

    next();
});

// create Geocode location field
BootcampSchema.pre('save', async function (next) {
    // this points to query document
    const loc = await geocoder.geocode(this.address);

    const {
        latitude,
        longitude,
        countryCode: country,
        stateCode: state,
        city,
        zipcode,
        streetName: street,
        formattedAddress,
    } = loc[0];

    this.location = {
        type: 'Point',
        coordinates: [longitude, latitude],
        formattedAddress,
        street,
        city,
        state,
        zipcode,
        country,
    };

    // Do not save  address in DB because we have formatedAddress now
    this.address = undefined;

    next();
});

// query middleware
BootcampSchema.pre(/^find/, async function (next) {
    // this point to current query object
    this.select('-__v');
    next();
});

const Bootcamp = mongooes.model('Bootcamp', BootcampSchema);

module.exports = Bootcamp;
