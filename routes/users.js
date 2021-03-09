const express = require('express');
const router = express.Router()
const User = require('../models/users')

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - email    
 *         - password    
 *         - role
 *       properties:
 *         _id:
 *           type: ObjectId               
 *           description: MongoDB Auto-Generated ID.               
 *         email:
 *           type: string               
 *           description: The Email of the user which will be used to log in.               
 *         password:
 *           type: string               
 *           description: We should store hashed passwords in the future.               
 *         role:
 *           type: string               
 *           description: |
 *             The responsability of the user, a user can be an Admin or a Maintainer
 *             which will give the user more or less permissions in controlling of other users or devices
 *         name:
 *           type: string               
 *           description: Name of user.               
 *         birthdate:
 *           type: Date               
 *           description: birthdate of user.               
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users Managing API
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns the list of users
 *     tags: [Users]
 *     responses: 
 *       200:
 *         description: The list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/User'      
 */

router.get('/', (req, res)=>{
    User.find()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'   
 *     responses: 
 *       200:
 *         description: The User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'      
 *       500:
 *         description: Some server error.
 */
router.post('/', (req, res) => {
    const { email, password, role, name, birthdate } = req.body
    const user = new User({ email, password, role, name, birthdate })
    user.save()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

module.exports = router;