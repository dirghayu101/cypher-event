const mongoose = require('mongoose')

const groupSchema = new mongoose.Schema({
    grpName: {
        type: String,
        required: [true, "Please enter a group name"],
        unique: true
    },
    grpID: {
        type: Number,
        unique: true,
        required: [true, "Please enter the group ID."]
    },
    grpMembers: {
        type: Array,
        default: [],
        required: [true, "Please enter the group members rNum and name."] //This again will be an array of object with rNum and
    },
    answerArr: {
        type: Array,
        default: [] //I will insert an array of object in this. Object will have rNum, Name, questionID, time and answer.
    }
})

module.exports = mongoose.model("Group", groupSchema)