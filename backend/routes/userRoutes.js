const express = require("express");
const controller = require("../controllers/userControllers");
const router = express.Router();

router.route("/login").get(controller.sendLoginPage)
router.route("/intro").get(controller.Introductionpage)
router.route("/scripts/login.js").get(controller.sendLoginJs)
router.route("/chatScreen").get(controller.chatScreen)
router.route("/images/:imageName").get(controller.Images)

module.exports = router;