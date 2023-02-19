const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const path = require("path");
const Users = require("../models/user.js");
const { sendToken } = require("../utils/jwt.js");
const Question = require("../models/question.js");
const User = require("../models/user.js");
const { getCurrentTime } = require("../utils/formatMessages.js");
const Group = require("../models/group.js");

module.exports.sendLoginPage = catchAsyncError((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../../public/login.html"));
});

module.exports.sendLoginJavaScript = catchAsyncError((req, res, next) => {
  res.type("application/javascript");
  res.sendFile(path.resolve(__dirname, "../../public/scripts/login.js"));
});

module.exports.IntroductionPage = catchAsyncError((req, res, next) => {
  res.sendFile(
    path.resolve(__dirname, "../../public/html/IntroductionPage.html")
  );
});

module.exports.chatScreen = catchAsyncError((req, res, next) => {
  const filePath = path.resolve(__dirname, "../../public/html/chat.html");
  res.sendFile(filePath);
});

module.exports.relatedImages = catchAsyncError((req, res, next) => {
  const image = req.params.imageName;
  res.sendFile(path.resolve(__dirname, `../../public/assets/images/${image}`));
});

module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorHandler("Please Enter Email and Password", 400));
  }
  let user = await Users.findOne({ rNum: username });
  if (!user) {
    return next(
      new ErrorHandler("Contact the organizers, you aren't registered.", 401)
    );
  }
  if (password != user.password) {
    return next(new ErrorHandler("Incorrect password.", 401));
  }
  sendToken(user, 200, res);
});

module.exports.processUserResponse = catchAsyncError(async (req, res, next) => {
  const { rNum, grpName, userName, answer } = req.body;
  let currentQuestion = await findCurrentQuestion(grpName);
  let answerArr = currentQuestion.answer.filter(ans => ans === answer).length
  if (answerArr <= 0) {
    return res.status(200).json({
      correctAnswer: false,
      message: "Why did we even hire you?",
    });
  }

  await markQuestionComplete(rNum, grpName, currentQuestion);
  let nextQuestion = await sendNextQuestion(grpName, currentQuestion);
  res.status(200).json({
    correctAnswer: true,
    message: "You did a wonderful job agents! The country owes you!",
    nextQuestion
  });
});

async function findCurrentQuestion(grpName) {
  let questions = await Question.find({
    "grpAnswer.grpName": grpName,
    "grpAnswer.hasAnswered": false,
  });
  questions.sort(function (a, b) {
    return a.qNum - b.qNum;
  });
  return questions[0];
}

async function markQuestionComplete(rNum, grpName, currentQuestion, answer) {
  // Logic to mark the current currentQuestion complete.
  let obj = {rNum, time:getCurrentTime(), answer, currentQuestion}
  let group = await Group.findOne({grpName})
  group.answerArr.push(obj)
  await Group.findOneAndUpdate({grpName}, group)
  let index = currentQuestion.grpAnswer.findIndex((ele) => ele.grpName === grpName)
  currentQuestion.grpAnswer[index].hasAnswered = true
  await Question.findOneAndUpdate({question:currentQuestion.question}, currentQuestion)
}

async function sendNextQuestion(grpName, currentQuestion) {
  let nextQuestionNum = currentQuestion.qNum + 1
  let nextQuestion = await Question.findOne({qNum:nextQuestionNum})
  return nextQuestion
}
