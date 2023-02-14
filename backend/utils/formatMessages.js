const moment = require('moment')

module.exports.formatMessage = (username, text, css) => {
    return{
        username,
        text, 
        css,
        time: moment().format('hh:mm')
    }
}