const express = require('express');
const router = express.Router()
const Device = require('../models/device')
const JoiSchema = require('../util/schemas/device')
const verify = require('../util/verify')
const { VerifyTypes } = require('../util/types/verify-types')

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
 *         user:
 *           type: string               
 *           description: User ID which this task is assigned to right now.               
 *         history:
 *           type: array
 *           items: 
 *             type: string
 *           description: The List of users who this task is assigned to in the past 
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
    async (req, res, next) => await verify(VerifyTypes.Maintainer, req, res, next),
    async (req, res, next)=>{
    JoiSchema.validateAsync(req.body)
    .then(validationRes=>{
        const device = new Device(validationRes)
        device.save()
        .then(data=>res.json(data))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

module.exports = router;