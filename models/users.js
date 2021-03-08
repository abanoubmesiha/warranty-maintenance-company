const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
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

module.exports = mongoose.model('Users', UserSchema)