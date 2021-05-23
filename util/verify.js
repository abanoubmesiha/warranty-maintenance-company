const jwt = require('jsonwebtoken');
const APIError = require('../models/api-error');
const { VerifyTypes } = require('./types/verify-types');
const User = require('../models/user')
const Role = require('../models/role')

module.exports = async function(requiredRole, req, res, next){
    const token = req.header('auth-token');
    if (!token){
        next(APIError.unauthorized())
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            if (requiredRole === VerifyTypes.Login){
                next()
            } else {
                const user = await User.findById(verified)
                const role = await Role.findById(user.roleId)
                if (requiredRole === role.name){
                    next()
                } else{
                    next(APIError.badReq(`${user.name} is ${role.name}, and this action should be done by a ${requiredRole}`))
                }
            }
        } catch (err) {
            next(APIError.badReq('Invalid Token'))
        }
    }
}