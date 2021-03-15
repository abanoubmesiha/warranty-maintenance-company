const express = require('express');
const router = express.Router()
const Device = require('../models/device')
const User = require('../models/user')

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
 *   name: Device
 *   description: The Device Managing API
 */
/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Returns the list of devices
 *     tags: [Device]
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
    Device.fetchAll()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})
/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Device]
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
router.post('/', async (req, res) => {
    let { name, user, history } = req.body;
    // '604a023feb49870015776940'
    if (user){
        user = await User.fetchOne(user);
        if (!user){
            throw 'Please, add a valid user if present'
        }
    } else {
        user = null
    }
    const device = new Device({ name, user, history })
    device.save()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

module.exports = router;