const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const User = require('./user');

const DeviceSchema = Schema({
  name: {
    type: String,
    required: true
  },
  assignedUserId: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: assignedUserId => {
        if (assignedUserId){
          return User.findById(assignedUserId)
        } else {
          // It is okay if the value null
          return true
        }
      },
      message: `This User isn't present in the database`
    },
    required: false
  },
  assigningHistory: {
    type: [
      {
        userId: Schema.Types.ObjectId,
        assigningDateAndTime: Schema.Types.Date
      }
    ],
    required: false
  },
  // maintenanceHistory: {
  //   type: [Schema.Types.ObjectId],
  //   validate: {
  //     validator: async usersIds => {
  //       const promises = [];
  //       for (const userId of usersIds){
  //         let res = await User.findById(userId).then(data=>data)
  //         promises.push(res);
  //       }
  //       return !promises.includes(null)
  //     },
  //     message: `One of the users in history isn't present in the database`
  //   },
  //   required: false
  // },
});

DeviceSchema.pre('findOneAndUpdate', async function(next){
  try {
    const docBeforeUpdate = await this.model.findOne(this.getQuery());
    const oldAssignedUserId = docBeforeUpdate.assignedUserId === null ? null : docBeforeUpdate.assignedUserId.toString()
    const newAssignedUserId = this._update.assignedUserId === null ? null : this._update.assignedUserId.toString()
    if (oldAssignedUserId !== newAssignedUserId){
      const newAssigningHistory = docBeforeUpdate.assigningHistory
      newAssigningHistory.push({
        userId: this._update.assignedUserId,
        assigningDateAndTime: new Date()
      })
      this._update.assigningHistory = newAssigningHistory
    }
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = model('Device', DeviceSchema)