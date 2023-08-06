const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'A Course should have a title'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A Course should have a description'],
    },
    weeks: {
        type: Number,
        required: [true, 'A Course should have a duration in weeks'],
    },
    tuition: {
        type: Number,
        required: [true, 'A Course should have a tuition cost'],
    },
    minimumSkill: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: 'minimumSkill is either: beginner, intermediate, advanced',
        },
    },
    scholarhipsAvailable: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    bootcamp: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bootcamp',
        required: [true, 'A Course should have a Bootcamp'],
    },
});

// Static method to get avg of course tuitions
CourseSchema.statics.getAverageCost = async function (bootcampId) {
    const stats = await this.aggregate([
        {
            $match: { bootcamp: bootcampId },
        },
        {
            $group: {
                _id: '$bootcamp',
                averageCost: { $avg: '$tuition' },
            },
        },
    ]);

    const averageCost = Math.round((stats[0].averageCost || 0) * 100) / 100;

    await this.model('Bootcamp').findByIdAndUpdate(bootcampId, {
        averageCost,
    });
};

// update bootcamp averageCost after save
CourseSchema.post('save', async function () {
    await this.constructor.getAverageCost(this.bootcamp);
});

// update bootcamp averageCost before remove
CourseSchema.pre('remove', async function (next) {
    await this.constructor.getAverageCost(this.bootcamp);
    next();
});

// set doc object in query object to resuse it after query is exectued
CourseSchema.pre(/^findOneAnd/, async function (next) {
    // this points to current query
    this.doc = await this.findOne();
    next();
});

// update bootcamp averageCost after any findOneAnd query
CourseSchema.post(/^findOneAnd/, async function () {
    await this.doc.constructor.getAverageCost(this.doc.bootcamp);
});

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
