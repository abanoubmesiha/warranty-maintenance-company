const express = require('express');
const APIError = require('../models/api-error');
const router = express.Router()
const User = require('../models/user')
const JoiSchema = require('../util/schemas/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       required:
 *         - email    
 *         - password   
 *       properties:
 *         email:
 *           type: string               
 *         password:
 *           type: string               
 */
/**
 * @swagger
 * tags:
 *   name: Auth Routes
 */
/**
 * @swagger
 *
 * /login:
 *   post:
 *     tags: [Auth Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             $ref: '#/components/schemas/Login'   
 *     responses: 
 *       200:
 *         description: The auth-token was successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Device'      
 *       500:
 *         description: Some server error.
 */
router.post('/', async (req, res, next) => {
    try {
        const {email, password} = await JoiSchema.validateAsync(req.body)
        
        const user = await User.findOne({email})
        if (!user) {
            next(APIError.badReq("Email is not found"))
            return;
        }

        const validPass = await bcrypt.compare(password, user.password)
        if (!validPass) {
            next(APIError.badReq("Password is wrong"))
            return;
        }

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)
    } catch (err) {
        next(err)
    }
})

module.exports = router;