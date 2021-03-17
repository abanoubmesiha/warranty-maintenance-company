const getDb = require('../util/database').getDb;
const APIError = require('../error/APIError');
const User = require('../models/user')
class Device {
  constructor(name, user, history) {
    this.user = user;
    this.history = history;
    this.name = name;
  }
  
  static async save(req, res, next) {
    let { name, user, history } = req.body;
    let allUsers = [user, ...history];
    for (const userId of allUsers){
      if (!await User.isValidId(userId)){
        next(APIError.badReq('Please, add a valid user if present'))
        return;
      }
    }
    const device = new Device(name, user, history);
    const db = getDb();
    return db
      .collection('devices')
      .insertOne(device)
      .then(data=>res.json(data.insertedId))
      .catch(()=>next(APIError.internal(`Couldn't Add a Device`)));
  }

  static fetchAll(req, res, next) {
    const db = getDb();
    return db
      .collection('devices')
      .find()
      .toArray()
      .then(products => res.json(products))
      .catch(() =>next(APIError.internal(`Couldn't fetch devices.`)));
  }
}

module.exports = Device;