const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const getDb = require('../util/database').getDb;
class User {
  constructor(email, password, role, name, birthdate) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.birthdate = birthdate;
  }

  static save() {
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
      .find({ _id: new ObjectId(userId) })
      .next()
      .then(user => user)
      .catch(err => {throw `Couldn't fetch the user. ${err}`});
  }

  static async isValidId(id){
    let res = false
    if (ObjectId.isValid(id)){
      let userFromResponse = await User.fetchOne(id);
      if (userFromResponse){
        res = true;
      }
    }
    return res
  }
}

module.exports = User;
