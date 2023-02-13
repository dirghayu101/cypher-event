const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('./catchAsyncError')
const jwt = require("jsonwebtoken")
const {Users} = require('../db/pseudoDB.js')

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to access these resources.", 401))
    }
    const verifyJWT = jwt.verify(token, process.env.JWT_SECRET)
    if(verifyJWT){
        req.user = Users.find((val) => val.rNum === verifyJWT.rNum)   //NOTE: Database request.
        return next()
    }
    return next(new ErrorHandler("Authentication failed.", 401))
})