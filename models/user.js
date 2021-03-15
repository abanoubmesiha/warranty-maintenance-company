const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
class User {
  constructor(email, password, role, name, birthdate) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.birthdate = birthdate;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('users')
      .find()
      .toArray()
      .then(users => users)
      .catch(err => {throw `Couldn't fetch users. ${err}`});
  }
  
  static fetchOne(userId){
    const db = getDb();
    return db.collection('users')
      .find({ _id: new mongodb.ObjectID(userId) })
      .next()
      .then(user => user)
      .catch(err => {throw `Couldn't fetch the user. ${err}`});
  }
}

module.exports = User;
