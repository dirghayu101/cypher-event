const express = require("express")
const app = express();
const cookieParser = require("cookie-parser")
const path = require("path")
const errorMiddleware = require("./middleware/error.js")
app.use(express.static(path.resolve(__dirname, "../public")))
// app.use(express.static());
app.use(express.json());
app.use(cookieParser());

// Router imports
const user = require("./routes/userRoutes.js")

// Router use
app.use("/user", user)
app.get('/', (req, res) => {
    res.redirect('user/login')
})

// Error Middleware
app.use(errorMiddleware)

module.exports = app