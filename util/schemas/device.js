const Joi = require('joi')

const deviceValidationSchema = Joi.object({
    name: Joi.string()
        .required(),

    userId: Joi.string(),

    history: Joi.array().items(Joi.string()),
})

module.exports = deviceValidationSchema