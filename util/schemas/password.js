const Joi = require('joi')

const passwordValidationSchema = Joi.object({
    oldPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),

    newPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        .required(),
})

module.exports = passwordValidationSchema