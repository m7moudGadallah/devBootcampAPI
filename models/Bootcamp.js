const mongooes = require('mongoose');
const validator = require('validator');
const slugify = require('slugify');
const { geocoder } = require('../utils');

const BootcampSchema = new mongooes.Schema(
    {
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
        averageCost: {
            type: Number,
            default: 0.0,
            set: (val) => Math.round(val * 100) / 100,
        },
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
        user: {
            type: mongooes.Schema.ObjectId,
            ref: 'User',
            required: [true, 'Bootcamp should have a user who create it'],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

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

// Cascade delete courses when a bootcamp is deleted (document middleware)
BootcampSchema.pre('remove', async function (next) {
    // console.log(`Deleting courses of bootcamp ${this._id}`.green);
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next();
});

// Reverse populate with virsuals
BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foreignField: 'bootcamp',
    justOne: true,
});

const Bootcamp = mongooes.model('Bootcamp', BootcampSchema);

module.exports = Bootcamp;
