const Joi = require('joi')

const AddUserSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .required(),

    roleId: Joi.string(),

    name: Joi.string()
        .required(),

    birthdate: Joi.date()
})
const UpdateUserSchema = Joi.object({
    roleId: Joi.string(),

    name: Joi.string()
        .required(),

    birthdate: Joi.date()
})

const extractUpdateUserStructure = user => ({
    roleId: user.roleId,
    name: user.name,
    birthdate: user.birthdate
})

module.exports = {
    AddUserSchema,
    UpdateUserSchema,
    extractUpdateUserStructure
}