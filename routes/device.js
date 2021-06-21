const express = require('express');
const router = express.Router()
const Device = require('../models/device')
const {
    AddDeviceSchema,
    UpdateDeviceSchema,
    UpdateDeviceMaintenanceSchema
} = require('../util/schemas/device')
const verify = require('../util/verify')
const { RolesTypes } = require('../util/types/roles-types')

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - name    
 *       properties:
 *         _id:
 *           type: ObjectId               
 *           description: MongoDB Auto-Generated ID.               
 *         name:
 *           type: string               
 *           description: The name of the device.               
 *         assignedUserId:
 *           type: string               
 *           description: User ID which this task is assigned to right now.               
 *         maintenanceHistory:
 *           type: array
 *           items: 
 *             type: string
 *           description: The List of users who this task is assigned to in the past 
 *     updateDevice:
 *       type: object
 *       properties:
 *         name:
 *           type: string               
 *           description: The name of the device.               
 *         assignedUserId:
 *           type: string               
 *           description: User ID which this task is assigned to right now.               
 *         maintenanceHistory:
 *           type: array
 *           items: 
 *             type: string
 *           description: The List of users who this task is assigned to in the past 
 *     addMaintainence:
 *       type: object
 *       properties:
 *         description:
 *           type: string               
 *           description: The description of the maintainence entry.               
 *         maintenanceUserId:
 *           type: string               
 *           description: Maintainer ID.               
 */
/**
 * @swagger
 * tags:
 *   name: Devices
 */
/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Returns the list of devices
 *     tags: [Devices]
 *     responses: 
 *       200:
 *         description: The list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Device'      
 */

router.get('/', (req, res)=>{
    Device.find()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})
/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     parameters:
 *     - in: header
 *       name: auth-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Device'   
 *     responses: 
 *       200:
 *         description: The Device was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'      
 *       500:
 *         description: Some server error.
 */
router.post('/',
    async (req, res, next) => await verify(RolesTypes.Maintainer, req, res, next),
    async (req, res, next)=>{
    AddDeviceSchema.validateAsync(req.body)
    .then(validationRes=>{
        const device = new Device(validationRes)
        device.save()
        .then(data=>res.json(data))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

/**
 * @swagger
 * /devices/:deviceId:
 *   put:
 *     summary: Update a device
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: auth-token
 *       - in: path
 *         name: deviceId
 *         required: true
 *         description: Object ID of the device to update  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/updateDevice'   
 *     responses: 
 *       200:
 *         description: Device is updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/updateDevice'        
 *       500:
 *         description: Some server error.
 */
router.put('/:deviceId',
    async (req, res, next) => await verify(RolesTypes.Admin, req, res, next),
    async (req, res, next) => {
    UpdateDeviceSchema.validateAsync(req.body)
    .then(validationRes=>{
        const { deviceId } = req.params;
        Device.findOneAndUpdate({ '_id': deviceId }, validationRes)
        .then(async data=>res.json(await Device.findById(data._id)))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})
/**
 * @swagger
 * /devices/{deviceId}:
 *   get:
 *     summary: Get all devices or a user by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: string
 *         required: false
 *         description: Object ID of the device to get   
 *     responses: 
 *       200:
 *         description: The list of devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Device'        
 *       500:
 *         description: Some server error.
 *   delete:
 *     summary: Delete a device
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: auth-token
 *       - in: path
 *         name: deviceId
 *         required: true
 *         description: Object ID of the device to Delete  
 *     responses: 
 *       200:
 *         description: Device is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/updateDevice'        
 *       500:
 *         description: Some server error.
 */
router.get('/:deviceId', (req, res)=>{
    const { deviceId } = req.params;
    Device.findById(deviceId)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

router.delete('/:deviceId',
    async (req, res, next) => await verify(RolesTypes.Admin, req, res, next),
    async (req, res, next) => {
    const { deviceId } = req.params;
    Device.findByIdAndDelete(deviceId)
    .then(data=>res.json(data))
    .catch(err=>next(err))
})
/**
 * @swagger
 * /:deviceId/maintenance:
 *   post:
 *     summary: Add a maintainence history
 *     tags: [Devices]
 *     parameters:
 *       - in: header
 *         name: auth-token
 *       - in: path
 *         name: deviceId
 *         required: true
 *         description: Object ID of the device to update  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/addMaintainence'   
 *     responses: 
 *       200:
 *         description: Device is updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/addMaintainence'        
 *       500:
 *         description: Some server error.
 */
router.post('/:deviceId/maintenance/',
    async (req, res, next) => await verify(RolesTypes.Maintainer, req, res, next),
    async (req, res, next) => {
    UpdateDeviceMaintenanceSchema.validateAsync(req.body)
    .then(validationRes=>{
        const { deviceId } = req.params;
        Device.findOneAndUpdate(
            { '_id': deviceId },
            { $push: { maintenanceHistory: {
                ...validationRes,
                dateAndTime: new Date()
            } } }
        )
        .then(async data=>res.json(await Device.findById(data._id)))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

module.exports = router;