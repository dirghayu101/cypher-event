const { questionArr } = require("../db/questionPush");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Questions = require("../models/question");

module.exports.insertQuestionsInCollection = catchAsyncError(
  async (req, res, next) => {
    let result = await Questions.insertMany(questionArr);
    if (!result) {
      return next(new ErrorHandler("Insertion didn't occur.", 500));
    }
    res.status(201).json({
      success: true,
      message: "Following questions successfully inserted:",
      result,
    });
  }
);

module.exports.deleteQuestionsInCollection = catchAsyncError(async (req, res, next) => {
  let result = await Questions.deleteMany();
  if (!result) {
    return next(new ErrorHandler("Deletion didn't occur.", 500));
  }
  res.status(201).json({
    success: true,
    message: "Following questions successfully deleted:",
    result,
  });
});

module.exports.getAllQuestions = catchAsyncError(async (req, res, next) => {
  let result = await Questions.find();

  res.status(201).json({
    success: true,
    message: "Following questions are there in the database:",
    result,
  });
});

module.exports.insertSingleQuestion = catchAsyncError(async (req, res, next) => {
    let obj = req.body
    await Questions.create(obj)
    res.status(201).json({
        success: true,
        message: "Inserted successfully!"
    })
})

module.exports.deleteQuestionById = catchAsyncError(async (req, res, next) => {
    let deleteId = req.params.id
    let result = await Questions.findByIdAndDelete({_id:deleteId})
    res.status(201).json({
        success: true,
        message: "The following question has been deleted: ",
        result
    })
})