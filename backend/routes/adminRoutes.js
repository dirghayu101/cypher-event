const express = require("express");
const { insertUser, authorizeAdmin, getAllUsers, getSingleUser, deleteSingleUser, updateUserInformation, getUsersByGrpName, deleteAllUsers, insertUserFromJsonFile} = require("../controllers/adminUserCollectionController");
const {insertGroup, updateGroupPatch, updateGroupPut, deleteGroup, getAllGroups, getSingleGroup, deleteAllGroups, insertMultipleGroups} = require("../controllers/adminGroupCollectionController.js")
const { isAuthenticatedAdmin } = require("../middleware/authorization");
const { getAllQuestions, insertSingleQuestion, deleteQuestionsInCollection, insertQuestionsInCollection, deleteQuestionById } = require("../controllers/adminQuestionController");
const router = express.Router();

// User collection route
router.route('/log-in').post(authorizeAdmin)
router.route('/register').post(isAuthenticatedAdmin, insertUser)
router.route('/all-users').get(isAuthenticatedAdmin, getAllUsers)
router.route('/user/:rNum').get(isAuthenticatedAdmin, getSingleUser)
router.route('/delete/:rNum').delete(isAuthenticatedAdmin, deleteSingleUser)
router.route('/update/:rNum').patch(isAuthenticatedAdmin, updateUserInformation)
router.route('/deleteAllUsers/confirm/deleteAll').delete(isAuthenticatedAdmin, deleteAllUsers)
router.route('/users/:grpName').get(isAuthenticatedAdmin, getUsersByGrpName)
router.route('/users/insert/insertUserFile').get(isAuthenticatedAdmin, insertUserFromJsonFile)
// A path to find all the members of a particular group and a delete all users path.

// Group collection route
router.route('/insertGroup').post(isAuthenticatedAdmin, insertGroup)
router.route('/insertMembers/:grpName').patch(isAuthenticatedAdmin, updateGroupPatch)  
router.route('/updateGroupPut/:grpName').put(isAuthenticatedAdmin, updateGroupPut)
router.route('/deleteGroup/:grpName').delete(isAuthenticatedAdmin, deleteGroup)
router.route('/getAllGroups').get(isAuthenticatedAdmin, getAllGroups)
router.route('/getSingleGroup/:grpName').get(isAuthenticatedAdmin, getSingleGroup)
router.route('/deleteAllGroups/confirm/deleteAll').delete(isAuthenticatedAdmin, deleteAllGroups)
router.route('/insertMultipleGroups').get(isAuthenticatedAdmin, insertMultipleGroups)

// Question Collection Routes
router.route('/insertSingleQuestion').post(isAuthenticatedAdmin, insertSingleQuestion)
router.route('/getAllQuestions').get(isAuthenticatedAdmin, getAllQuestions)
router.route('/deleteQuestions').delete(isAuthenticatedAdmin, deleteQuestionsInCollection)
router.route('/insertAllQuestions').get(isAuthenticatedAdmin, insertQuestionsInCollection)
router.route('/deleteSingleQuestion/:id').delete(isAuthenticatedAdmin, deleteQuestionById)

module.exports = router;