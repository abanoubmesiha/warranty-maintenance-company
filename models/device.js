const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: false
  },
  history: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Device', DeviceSchema)