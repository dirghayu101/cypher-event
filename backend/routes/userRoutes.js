const express = require("express");
const { sendLoginPage } = require("../controllers/userControllers");
const router = express.Router();

router.route("/login").get(sendLoginPage)

module.exports = router;