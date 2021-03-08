const mongoose = require('mongoose');

const DevicesSchema = mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    history: {
        type: [String],
        required: false
    },
    name: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Devices')