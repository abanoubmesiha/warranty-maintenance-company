const Joi = require('joi')

const passwordValidationSchema = Joi.object({
    oldPassword: Joi.string()
        .required(),

    newPassword: Joi.string()
        .required(),
})

module.exports = passwordValidationSchema