const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should have more than 3 characters"]
    },

    rNum: {
        type: String,
        required: [true, "Enter the registration number."],
        unique: true
    },

    fromSJU: {
        type: Boolean,
        default: true
    },

    college: {
        type: String,
        default: `St. Joseph's University`
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password should be greater than 8 characters"]
    },
    grpName: {
        type: String,
        ref: "Group",
        required: [true, "This is a group event."]
    },
    cssValue: {
        type: String
    }
})

module.exports = mongoose.model("User", userSchema); 
