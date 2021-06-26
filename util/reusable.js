const User = require('../models/user')
const Role = require('../models/role')

const isUserRoleEquals = async (id, userRoleName) => {
    const user = await User.findById(id)
    const role = await Role.findById(user.roleId)
    if (!role){
        return false
    }
    return role.name === userRoleName
}

module.exports = {
    isUserRoleEquals,
}