const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const User = require('./user');
const Role = require('./role');
const { RolesTypes } = require('../util/types/roles-types');
const getUser = require('../util/verify')

// validator: maintenanceUserId => {
//   console.log(maintenanceUserId)
//   if (maintenanceUserId){
//   let res = false;
//   const user = User.findById(maintenanceUserId)
//   if (!user){
    
//   }
//   if (user.roleId){
//     const role = Role.findById(user.roleId)
//     if (role.name === RolesTypes.Maintainer) res = true
//   }
//   return res
// } else {
//   // It is okay if the value null
//   return true
// }
// },
// message: `This User isn't present in the database or not a Maintainer`

const MaintenanceSchema = Schema({
  description: {
    type: String,
    required: true
  },
  dateAndTime: Schema.Types.Date,
  maintenanceUserId: {
    type: Schema.Types.ObjectId,
    validate: [
      // { validator: getUser, msg: "This User isn't present in the database" },
      // { validator: isUserMaintainer, msg: "This User isn't a Maintainer" }
    ],
    required: true
  }
});

const DeviceSchema = Schema({
  name: {
    type: String,
    required: true
  },
  assignedUserId: {
    type: Schema.Types.ObjectId,
    validate: {
      validator: assignedUserId => {
        console.log(assignedUserId)
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
  maintenanceHistory: {
    type: [MaintenanceSchema],
    required: false
  },
});

DeviceSchema.pre('findOneAndUpdate', async function(next){
  try {
    const docBeforeUpdate = await this.model.findOne(this.getQuery());
    const oldAssignedUserId = docBeforeUpdate.assignedUserId == null ? null : docBeforeUpdate.assignedUserId.toString()
    const newAssignedUserId = this._update.assignedUserId == null ? null : this._update.assignedUserId.toString()
    
    if (oldAssignedUserId !== newAssignedUserId){
      const newAssigningHistory = docBeforeUpdate.assigningHistory
      newAssigningHistory.push({
        userId: this._update.assignedUserId,
        assigningDateAndTime: new Date()
      })
      this._update.assigningHistory = newAssigningHistory
    }
    this.options.runValidators = true
    next()
  } catch (err) {
    next(err)
  }
})
  
module.exports = model('Device', DeviceSchema)