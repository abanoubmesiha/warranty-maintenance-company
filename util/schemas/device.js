const Joi = require('joi')

const AddDeviceSchema = Joi.object({
    name: Joi.string()
        .required(),

    assignedUserId: Joi.string().allow(null),

    history: Joi.array().items(Joi.string()),
})

const UpdateDeviceSchema = Joi.object({
    name: Joi.string()
        .required(),

    assignedUserId: Joi.string().allow(null),

    // maintenanceHistory: Joi.array().items(Joi.string()),
})

module.exports = {
    AddDeviceSchema,
    UpdateDeviceSchema,
}