const Joi = require('joi')

const AddDeviceSchema = Joi.object({
    name: Joi.string().required(),

    assignedUserId: Joi.string().allow(null),

    history: Joi.array().items(Joi.string())
})

const UpdateDeviceSchema = Joi.object({
    name: Joi.string().required(),

    assignedUserId: Joi.string().allow(null)
})

const UpdateDeviceMaintenanceSchema = Joi.object({
    description: Joi.string().required(),

    maintenanceUserId: Joi.string().required()
})

module.exports = {
    AddDeviceSchema,
    UpdateDeviceSchema,
    UpdateDeviceMaintenanceSchema,
}