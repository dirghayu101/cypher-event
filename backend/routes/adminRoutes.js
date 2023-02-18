const express = require("express");
const { insertUser, authorizeAdmin, getAllUsers, getSingleUser, deleteSingleUser, updateUserInformation, getUsersByGrpName, deleteAllUsers} = require("../controllers/adminUserCollectionController");
const {insertGroup, updateGroupPatch, updateGroupPut, deleteGroup, getAllGroups, getSingleGroup, deleteAllGroups} = require("../controllers/adminGroupCollectionController.js")
const { isAuthenticatedAdmin } = require("../middleware/authorization");
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
// A path to find all the members of a particular group and a delete all users path.

// Group collection route
router.route('/insertGroup').post(isAuthenticatedAdmin, insertGroup)
router.route('/insertMembers/:grpName').patch(isAuthenticatedAdmin, updateGroupPatch)  
router.route('/updateGroupPut/:grpName').put(isAuthenticatedAdmin, updateGroupPut)
router.route('/deleteGroup/:grpName').delete(isAuthenticatedAdmin, deleteGroup)
router.route('/getAllGroups').get(isAuthenticatedAdmin, getAllGroups)
router.route('/getSingleGroup/:grpName').get(isAuthenticatedAdmin, getSingleGroup)
router.route('/deleteAllGroups/confirm/deleteAll').delete(isAuthenticatedAdmin, deleteAllGroups)

module.exports = router;