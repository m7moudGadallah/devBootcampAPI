const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Review should have a title'],
        maxLength: 100,
    },
    text: {
        type: String,
        required: [true, 'Please add some text'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: [true, 'A Review should have a Bootcamp'],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'A Review should have a User'],
    },
});

// prevent user from submitting more than one review
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get averageRatings for bootcamp
ReviewSchema.statics.getAverageRatings = async function (bootcampId) {
    const stats = await this.aggregate([
        {
            $match: { bootcamp: bootcampId },
        },
        {
            $group: {
                _id: '$bootcamp',
                averageRatings: { $avg: '$rating' },
            },
        },
    ]);

    const averageRatings =
        Math.round((stats[0].averageRatings || 0) * 100) / 100;

    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageRatings,
    });
};

// update bootcamp averageRatings after save
ReviewSchema.post('save', async function () {
    await this.constructor.getAverageRatings(this.bootcamp);
});

// update bootcamp averageRatings before remove
ReviewSchema.pre('remove', async function (next) {
    await this.constructor.getAverageRatings(this.bootcamp);
    next();
});

// set doc object in query object to resuse it after query is exectued
ReviewSchema.pre(/^findOneAnd/, async function (next) {
    // this points to current query
    this.doc = await this.findOne();
    next();
});

// update bootcamp averageRatings after any findOneAnd query
ReviewSchema.post(/^findOneAnd/, async function () {
    await this.doc.constructor.getAverageRatings(this.doc.bootcamp);
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
