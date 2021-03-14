const getDb = require('../util/database').getDb;
class Device {
  constructor(user, history, name) {
    this.user = user;
    this.history = history;
    this.name = name;
  }

  save() {
    const db = getDb();
    return db
      .collection('devices')
      .insertOne(this)
      .then()
      .catch(err => {throw `Couldn't fetch devices ${err}`});
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('devices')
      .find()
      .toArray()
      .then(products => products)
      .catch(err => {throw `Couldn't fetch devices ${err}`});
  }
}

module.exports = Device;