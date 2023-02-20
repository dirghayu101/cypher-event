const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: Array,
        required: [true],
        unique: true,
        default: []
    },
    answer: {
        type: Array,
        required: [true]
    },
    qNum: {
        type: Number,
        required: [true],
        unique: true
    },
    grpAnswer: {
        type: Array,
        default: []
    },
})

module.exports = mongoose.model("Questions", questionSchema);