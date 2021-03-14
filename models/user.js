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
      .then(users => {
        console.log(users);
        return users;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = User;
