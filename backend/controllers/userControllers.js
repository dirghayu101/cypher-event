const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const path = require("path");
const Users = require("../models/user.js");
const { sendToken } = require("../utils/jwt.js");
const Question = require("../models/question.js");
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
  const totalQuestions = await getTotalQuestions()
  const { rNum, grpName, userName, answer } = req.body;
  let currentQuestion = await findCurrentQuestion(grpName);
  if(!currentQuestion){
    return res.status(200).json({
      correctAnswer: false,
      message: 'If you have given all the answers, meet us for the next mission. If you are unable to access the game, contact the organizers.'
    })
  }
  let answerArr = currentQuestion.answer.filter(ans => ans === answer).length
  if (answerArr <= 0) {
    return res.status(200).json({
      correctAnswer: false,
      message: "Why did we even hire you?",
    });
  }
  await markQuestionComplete(rNum, grpName, currentQuestion);
  //Last question condition.
  if(currentQuestion.qNum === totalQuestions){
    return res.status(200).json({
      correctAnswer: false,
      message: "Agents you have figured out the target location. The country wants more from you. Meet us on our next mission at St. Joseph's University, Bangalore. Until then, Stay alert!"
    })
  }
  let {question:nextQuestion} = await sendNextQuestion(currentQuestion);
  res.status(200).json({
    correctAnswer: true,
    message: "You did a wonderful job agents! The country owes you!",
    nextQuestion
  });
});

module.exports.getLastQuestion = catchAsyncError(async (req, res, next) =>{
  let grpName = req.params.grpName
  let currentQuestion = await findCurrentQuestion(grpName)
  if(!currentQuestion){
    currentQuestion = `You have successfully answered all the questions agents. The next task is to meet at St. Joseph's University for the final mission!`
  } else{
    currentQuestion = currentQuestion.question
  }
  res.status(200).json({
    success: true,
    message: "Successfully received the message!",
    currentQuestion
  })
})

module.exports.sendChatImage = catchAsyncError(async (req, res, next) => {
  const imgName = req.params.imgName
  const imagePath = path.resolve(__dirname, `../db/chat-src/${imgName}.jpeg`);
  res.sendFile(imagePath)
})

async function findCurrentQuestion(grpName) {
  let questions = await Question.find();
  let finalQuestion
  questions.sort(function (a, b) {
    return a.qNum - b.qNum;
  });
  for(const question of questions){
    let isQuestion = question.grpAnswer.find((ans) => (ans.grpName === grpName && ans.hasAnswered === false))
    if(isQuestion){
      finalQuestion = question
      break
    }
  }
  return finalQuestion
}

async function markQuestionComplete(rNum, grpName, currentQuestion, answer) {
  let obj = {rNum, time:getCurrentTime(), answer, currentQuestion}
  let group = await Group.findOne({grpName})
  group.answerArr.push(obj)
  await Group.findOneAndUpdate({grpName}, group)
  let index = currentQuestion.grpAnswer.findIndex((ele) => ele.grpName === grpName)
  currentQuestion.grpAnswer[index].hasAnswered = true
  await Question.findOneAndUpdate({qNum: currentQuestion.qNum}, currentQuestion)
}

async function sendNextQuestion(currentQuestion) {
  let nextQuestionNum = currentQuestion.qNum + 1
  let nextQuestion = await Question.findOne({qNum:nextQuestionNum})
  return nextQuestion
}

async function getTotalQuestions() {
  let questions = await Question.find()
  return questions.length
}
