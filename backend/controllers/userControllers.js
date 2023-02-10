const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const path = require("path");

module.exports.sendLoginPage = catchAsyncError((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../../public/login.html"))
});