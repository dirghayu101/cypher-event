const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true],
        unique: true
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