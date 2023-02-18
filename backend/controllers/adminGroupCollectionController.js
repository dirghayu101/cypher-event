const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middleware/catchAsyncError.js");
const { sendAdminToken } = require("../utils/jwt.js");
const Group = require("../models/group.js");

module.exports.insertGroup = catchAsyncError(async (req, res, next) => {
    const {grpName, grpID, grpMembers} = req.body
    if(!grpName || !grpID || !grpMembers){
        return next(new ErrorHandler("Please enter all the fields: grpName, grpID and grpMembers"), 400)
    }
    const grp = await Group.create({grpName, grpID, grpMembers})
    if(!grp){
        return next(new ErrorHandler("Server error occurred.", 500))
    }
    res.status(201).json({
        success: true,
        message: "Group successfully inserted in the collection: ",
        grp
    })
})

module.exports.updateGroupPatch = catchAsyncError(async (req, res, next) => {
    const name = req.params.grpName
    const{ grpMembers} = req.body
    let grp = await Group.findOne({grpName:name})
    const modGrp = grp
    if(!grp){
        return next(new ErrorHandler("Group with the name given doesn't exist in the collection.", 400))
    }
    grpMembers.forEach((member) => grp.grpMembers.push(member))
    const originalGrp = await Group.findOneAndUpdate({grpName: name}, grp, {runValidators:true})

    res.status(201).json({
        success: true,
        message: `Successfully patched the group.`,
        originalGrp,
        modGrp,
    })
})

module.exports.updateGroupPut = catchAsyncError(async (req, res, next) => {
    const name = req.params.grpName
    let grp = await Group.findOne({grpName:name})
    const modGrp = grp
    if(!grp){
        return next(new ErrorHandler("Group with the name given doesn't exist in the collection.", 400))
    }
    const originalGrp = await Group.findOneAndUpdate({grpName: name}, req.body, {runValidators: true})

    res.status(201).json({
        success: true,
        message: `Modified the group successfully!`,
        originalGrp,
        modGrp,
    })
})

module.exports.deleteGroup = catchAsyncError(async (req, res, next) => {
    const name = req.params.grpName
    let grp = await Group.findOneAndDelete({grpName: name})
    if(!grp){
        return next(new ErrorHandler("Group doesn't exist in the group collection.", 400))
    }
    res.status(201).json({
        success: true,
        message: "Successfully deleted the bellow group: ",
        grp 
    })
})

module.exports.getAllGroups = catchAsyncError(async (req, res, next) => {
    const grps = await Group.find()
    if(!grps){
        return next(new ErrorHandler(`DB not responding.`, 500))
    }
    res.status(201).json({
        success: true,
        message: 'Group collection: ',
        grps
    })
})

module.exports.getSingleGroup = catchAsyncError(async (req, res, next) => {
    const name = req.params.grpName
    let grp = await Group.findOne({grpName: name})
    if(!grp){
      return next(new ErrorHandler(`Group doesn't exist in the collection.`, 500))
    } 
    res.status(201).json({
      success: true,
      message: "The group is: ",
      grp 
    })
})

module.exports.deleteAllGroups = catchAsyncError(async (req, res, next) => {
    await Group.deleteMany()
    res.status(201).json({
        success: true,
        message: "Deleted all the groups in the collection."
    })
})