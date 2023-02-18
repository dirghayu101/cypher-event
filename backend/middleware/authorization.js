const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('./catchAsyncError')
const jwt = require("jsonwebtoken")
const User = require('../models/user')

module.exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Please login to access these resources.", 401))
    }
    const verifyJWT = jwt.verify(token, process.env.JWT_SECRET)
    if(verifyJWT){
        req.user = await User.findOne({rNum: verifyJWT.rNum})
        return next()
    }
    return next(new ErrorHandler("Authentication failed.", 401))
})

module.exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {
    const {token} = req.cookies
    if(!token){
        return next(new ErrorHandler("Unauthorized access, cannot find token.", 401))
    }
    const verifyJWT = jwt.verify(token, process.env.ADMIN_JWT_SECRET)
    if(verifyJWT){
        return next()
    }
    return next(new ErrorHandler("Token Expired or is invalid.", 401))
})