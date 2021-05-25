const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const hashPassword = require('../util/schemas/hash-password');

const UserSchema = Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roleId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    birthdate: {
        type: Date,
        required: false
    }
});

UserSchema.pre('save', async function(next){
    try {
        const hashedPassword = await hashPassword(this.password)
        this.password = hashedPassword
        next()
    } catch (err) {
        next(err)
    }
})

module.exports = mongoose.model('User', UserSchema)