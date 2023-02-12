const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const path = require("path");
sendLoginPage = catchAsyncError((req, res, next) => {
    res.sendFile(path.resolve(__dirname, "../../public/login.html"))
});
sendLoginJs=catchAsyncError((req, res, next) => {
    res.type('application/javascript');
    res.sendFile(path.resolve(__dirname, "../../public/scripts/login.js"))
});
Introductionpage = catchAsyncError((req, res, next) => {
    
    res.sendFile(path.resolve(__dirname, "../../public/html/IntroductionPage.html"))
});
chatScreen = catchAsyncError((req, res, next) => {
    
    res.sendFile(path.resolve(__dirname, "../../public/html/chat.html"))
});
Images = catchAsyncError((req, res, next) => {
    console.log(req.params.imageName)
    const image=req.params.imageName
    res.sendFile(path.resolve(__dirname, `../../public/assets/images/${image}`))
});



module.exports={
    sendLoginPage,
    Introductionpage,
    sendLoginJs,
    chatScreen,
    Images
}