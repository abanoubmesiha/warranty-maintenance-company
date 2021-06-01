const jwt = require('jsonwebtoken');
const APIError = require('../models/api-error');
const { RolesTypes } = require('./types/roles-types');
const User = require('../models/user')
const Role = require('../models/role')

const isRoleValid = (requiredRoleName, userRole) => {
    let res = false;
    if (requiredRoleName === userRole.name || userRole.name === RolesTypes.Admin){
        res = true;
    } 
    return res;
}

module.exports = async function(requiredRoleName, req, res, next){
    const token = req.header('auth-token');
    if (!token){
        next(APIError.unauthorized())
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET)
            req.user = verified;
            if (requiredRoleName === RolesTypes.User){
                next()
            } else {
                const user = await User.findById(verified)
                const role = await Role.findById(user.roleId)
                if (isRoleValid(requiredRoleName, role)){
                    next()
                } else{
                    next(APIError.badReq(`${user.name} is ${role.name}, and this action should be done by ${
                        requiredRoleName === RolesTypes.Admin
                        ?'an Admin'
                        :'a ' + requiredRoleName
                    }`))
                }
            }
        } catch (err) {
            next(APIError.badReq('Invalid Token'))
        }
    }
}