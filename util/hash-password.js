const bcrypt = require('bcrypt')

module.exports = async function(pass){
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(pass, salt)
    return hashPassword
}