const express = require('express');
const router = express.Router()
const User = require('../models/user')
const JoiSchema = require('../util/schemas/user')
const passwordJoiSchema = require('../util/schemas/password')
const verify = require('../util/verify')
const { VerifyTypes } = require('../util/types/verify-types')
const APIError = require('../models/api-error');
const bcrypt = require('bcrypt');
const hashPassword = require('../util/schemas/hash-password');

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
 * /users/{userId}:
 *   get:
 *     summary: Get all users or a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: false
 *         description: Object ID of the user to get   
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
router.get('/:userId', (req, res)=>{
    const { userId } = req.params;
    User.findById(userId)
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     parameters:
 *     - in: header
 *       name: auth-token
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
router.post('/',
    async (req, res, next) => await verify(VerifyTypes.Admin, req, res, next),
    async (req, res, next) => {
    JoiSchema.validateAsync(req.body)
    .then(validationRes=>{
        const user = new User(validationRes)
        user.save()
        .then(data=>res.json(data))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

/**
 * @swagger
 * users/change-password:
 *   post:
 *     summary: Change password of logged in user
 *     tags: [Users]
 *     parameters:
 *     - in: header
 *       name: auth-token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties: 
 *               oldPassword: 
 *                 type: string       
 *               newPassword: 
 *                 type: string       
 *             required:
 *             - oldPassword
 *             - newPassword
 *     responses: 
 *       200:
 *         description: The password is successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'      
 *       500:
 *         description: Some server error.
 */
 router.post('/change-password',
    async (req, res, next) => await verify(VerifyTypes.LoggedIn, req, res, next),
    async (req, res, next) => {
    try {
        const {oldPassword, newPassword} = await passwordJoiSchema.validateAsync(req.body)
        
        const user = await User.findOne({_id: req.user})
        if (!user) {
            next(APIError.badReq("Logged in User data is not found, the user might be deleted after being used for logging in"))
            return;
        }

        const validPass = await bcrypt.compare(oldPassword, user.password)
        if (!validPass) {
            next(APIError.badReq("Password is wrong"))
            return;
        }

        const hashedPassword = await hashPassword(newPassword);

        User.findOneAndUpdate({_id: user._id}, {password: hashedPassword})
        .then(data=>res.json(data))
        .catch(err=>next(err))

    } catch (err) {
        next(err)
    }
})

/**
 * @swagger
 * /users/userId:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *     - in: header
 *       name: auth-token
 *     - in: path
 *       name: userId
 *         required: false
 *         description: Object ID of the user to update  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/User'   
 */
router.put('/',
    async (req, res, next) => await verify(VerifyTypes.Admin, req, res, next),
    async (req, res, next) => {
    JoiSchema.validateAsync(req.body)
    .then(validationRes=>{
        const { userId } = req.params;
        User.findOneAndUpdate({ '_id': userId }, validationRes)
        .then(data=>res.json(data))
        .catch(err=>next(err))
    })
    .catch(err=>next(err))
})

module.exports = router;