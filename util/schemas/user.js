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
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string(),

    roleId: Joi.string(),

    name: Joi.string()
        .required(),

    birthdate: Joi.date()
})

module.exports = {
    AddUserSchema,
    UpdateUserSchema,
}