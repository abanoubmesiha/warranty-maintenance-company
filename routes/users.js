const express = require('express');
const router = express.Router()
const User = require('../models/users')

router.get('/', (req, res)=>{
    User.find()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

router.post('/', (req, res) => {
    const { email, password, role, name, birthdate } = req.body
    const user = new User({ email, password, role, name, birthdate })
    user.save()
    .then(data=>res.json(data))
    .catch(err=>res.json(err))
})

module.exports = router;