const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const User = require('./user');

const DeviceSchema = Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: userId => User.findById(userId),
      message: `This User isn't present in the database`
    },
    required: false
  },
  history: {
    type: [Schema.Types.ObjectId],
    validate: {
      validator: async usersIds => {
        const promises = [];
        for (const userId of usersIds){
          let res = await User.findById(userId).then(data=>data)
          promises.push(res);
        }
        return !promises.includes(null)
      },
      message: `One of the users in history isn't present in the database`
    },
    required: false
  },
});

module.exports = model('Device', DeviceSchema)