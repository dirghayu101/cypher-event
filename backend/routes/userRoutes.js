const express = require("express");
const router = express.Router();
const {
    sendLoginPage,
    IntroductionPage,
    chatScreen,
    relatedImages,
    loginUser,
    sendLoginJavaScript,
    processUserResponse,
    getLastQuestion,
    sendChatImage,
    logoutUser
  } = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middleware/authorization");

router.route("/login").get(sendLoginPage).post(loginUser);
router.route("/scripts/login.js").get(sendLoginJavaScript)
router.route("/intro").get(isAuthenticatedUser, IntroductionPage);
router.route("/chatScreen").get( isAuthenticatedUser, chatScreen).post(isAuthenticatedUser, processUserResponse); 
router.route("/images/:imageName").get(isAuthenticatedUser, relatedImages); 
router.route('/lastQuestion/:grpName').get(isAuthenticatedUser, getLastQuestion)
router.route('/chat-src/:imgName').get(isAuthenticatedUser, sendChatImage)
router.route('/logout').get(isAuthenticatedUser, logoutUser)

module.exports = router;
