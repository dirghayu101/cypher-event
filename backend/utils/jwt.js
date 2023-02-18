const jwt = require('jsonwebtoken')

const getJWTToken = (rNum) => {
    return jwt.sign({rNum:rNum}, process.env.JWT_SECRET, {
        expiresIn: 5400000 //90 minutes
    })
}

module.exports.sendToken = (user, statusCode, res) => {
    const token = getJWTToken(user.rNum) 
       //!NOTE: This will change. If it will be a method of user in mongodb.
    const options = {
        
        expires: new Date(
            Date.now() + 90 * 60 * 1000 //90 minutes to milliseconds.
        ),
        httpOnly: true,
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user, 
        token,
    
    })

}

module.exports.sendAdminToken = (rNum, statusCode, res) => {
    const token = jwt.sign({rNum:rNum}, process.env.ADMIN_JWT_SECRET, {
        expiresIn: 600000 //10 minutes
    })
    const options = {
        expires: new Date(
            Date.now() + 10 * 60 * 1000 //10 minutes to milliseconds.
        ),
        httpOnly: true,
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
}