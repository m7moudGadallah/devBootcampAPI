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

const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;
