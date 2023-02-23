const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const { sendAdminToken } = require("../utils/jwt.js");
const User = require("../models/user.js");
const {Users:pseudoDbUsers} = require('../db/pseudoDB.js')


module.exports.authorizeAdmin = catchAsyncError(async (req, res, next) => {
    const {rNum, password} = req.body
    if(!rNum || !password){
        return next(new ErrorHandler("Please Enter Email and Password", 400))
      }
    if((rNum === process.env.ADMIN_RNUM) && password === (process.env.ADMIN_PASSWORD)){
        return sendAdminToken(rNum, 201, res)
    }
    next(new ErrorHandler("Username or password is incorrect.", 401))
})

module.exports.insertUser = catchAsyncError(async (req, res, next) => {
  const { name, rNum, password, grpName, fromSJU, college, cssValue } =
    req.body;
  const user = await User.create({
    name,
    rNum,
    password,
    grpName,
    fromSJU,
    college,
    cssValue,
  });
  if(!user){
    return next(new ErrorHandler("Server error occurred.", 500))
}
  res.status(201).json({
    success: true,
    message: "User has been successfully registered.",
    user,
  });
});

// getAllUsers, getSingleUser, deleteSingleUser, updateUserInformation

module.exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find()
  if(!users){
    return next(new ErrorHandler(`DB not responding.`, 500))
  }
  res.status(201).json({
    success: true,
    message: "Successfully retrieved data.",
    users
  })
})

module.exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const rNum = req.params.rNum
    let user = await User.findOne({rNum})
    if(!user){
      return next(new ErrorHandler(`User doesn't exist in the collection.`, 500))
    } 
    res.status(201).json({
      success: true,
      message: "The user is: ",
      user 
    })
})

module.exports.deleteSingleUser = catchAsyncError(async (req, res, next) => {
    const rNum = req.params.rNum
    let user = await User.findOne({rNum})
    if(!user){
      return next(new ErrorHandler(`User doesn't exist.`, 404))
    }
    user = await User.findOneAndDelete({rNum})
    if(!user){
      return next(new ErrorHandler(`Something went wrong.`, 500))
    } 
    res.status(201).json({
      success: true,
      message: "Successfully deleted the bellow user: ",
      user 
    })
})

module.exports.updateUserInformation = catchAsyncError(async (req, res, next) => {
    const rNum = req.params.rNum
    let user = await User.findOne({rNum})
    const originalUser = user
    if(!user){
      return next(new ErrorHandler(`User doesn't exist.`, 404))
    }
    user = await User.findOneAndUpdate(rNum, req.body, {
      runValidators: true, 
    })
    user = await User.findOne({rNum})
    res.status(201).json({
      success: true,
      message: "Updated the user successfully.",
      originalUser,
      afterUpdateUser: user
    })
})

module.exports.deleteAllUsers = catchAsyncError(async (req, res, next) => {
  await User.deleteMany()
  res.status(201).json({
    success: true,
    message: "Deleted all users in the collection."
  })
})

module.exports.getUsersByGrpName = catchAsyncError(async (req, res, next) => {
  let grpName = req.params.grpName
  let users = await User.find({grpName})
  res.status(201).json({
    success: true,
    message: "Users with the group name queried: ",
    users
  })
})

module.exports.insertUserFromJsonFile = catchAsyncError(async (req, res, next) => {
  let result = await User.insertMany(pseudoDbUsers)
  if (!result) {
    return next(new ErrorHandler("Insertion didn't occur.", 500));
  }
  res.status(201).json({
    success: true,
    message: "Following users successfully inserted:",
    result,
  });
})
