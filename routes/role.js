const express = require('express');
const router = express.Router()
const Role = require('../models/role')

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: ObjectId               
 *           description: MongoDB Auto-Generated ID.               
 *         name:
 *           type: string               
 *           description: Name of role.               
 */
/**
 * @swagger
 * tags:
 *   name: Roles
 */
/**
 * @swagger
 * /roles:
 *   get:
 *     summary: Returns the list of roles
 *     tags: [Roles]
 *     responses: 
 *       200:
 *         description: The list of roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Role'        
 *       500:
 *         description: Some server error.   
 */
router.get('/', (req, res)=>{
    Role.find()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

module.exports = router;