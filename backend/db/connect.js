const mongoose = require('mongoose')

module.exports.connectDB = async (mongoURI) => {
    return mongoose
    .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}