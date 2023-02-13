const express = require("express");
const router = express.Router();
const {
    sendLoginPage,
    IntroductionPage,
    chatScreen,
    relatedImages,
    loginUser,
    setupSocketConnection,
    sendLoginJavaScript
  } = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middleware/authorization");

router.route("/login").get(sendLoginPage).post(loginUser);
router.route("/scripts/login.js").get(sendLoginJavaScript)
router.route("/intro").get(isAuthenticatedUser, IntroductionPage);
router.route("/chatScreen").get( isAuthenticatedUser, chatScreen); 
router.route("/images/:imageName").get(isAuthenticatedUser, relatedImages); 

module.exports = router;
