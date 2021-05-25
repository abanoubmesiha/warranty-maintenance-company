const mongoose = require('mongoose');

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Role', RoleSchema)