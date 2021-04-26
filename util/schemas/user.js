const Joi = require('joi')

const userValidationSchema = Joi.object({
    email: Joi.string()
        .email()
        .lowercase()
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    role: Joi.string(),

    name: Joi.string()
        .required(),

    birthdate: Joi.date()
})

module.exports = userValidationSchema