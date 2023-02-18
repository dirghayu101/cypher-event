const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const path = require("path");
const Users = require('../models/user.js')
const { sendToken } = require("../utils/jwt.js");


module.exports.sendLoginPage = catchAsyncError((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../../public/login.html"));
});

module.exports.sendLoginJavaScript = catchAsyncError((req, res, next) => {
  res.type('application/javascript');
  res.sendFile(path.resolve(__dirname, "../../public/scripts/login.js"))
});

module.exports.IntroductionPage = catchAsyncError((req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "../../public/html/IntroductionPage.html")
  );
});

module.exports.chatScreen = catchAsyncError((req, res, next) => {
  const filePath = path.resolve(__dirname, "../../public/html/chat.html")
  res.sendFile(filePath)
});

module.exports.relatedImages = catchAsyncError((req, res, next) => {
  const image = req.params.imageName;
  res.sendFile(path.resolve(__dirname, `../../public/assets/images/${image}`));
});

module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const {username, password} = req.body
  if(!username || !password){
    return next(new ErrorHandler("Please Enter Email and Password", 400))
  }
  let user = await Users.findOne({rNum:username})
  if(!user){
    return next(new ErrorHandler("Contact the organizers, you aren't registered.", 401))
  }
  if(password != user.password){
    return next(new ErrorHandler("Incorrect password.", 401))
  }
  sendToken(user, 200, res)
})



module.exports.processUserResponse = catchAsyncError((req, res, next) => {
  const response = req.body
  // TODO: Logic for response should be here.
  res.status(200).json({
    success: true,
    message: 'Your answer is correct motherfucker!'
  })
})

