const getDb = require("../util/database").getDb;

class Users {
  constructor(email, password, favourites) {
    this.email = email;
    this.password = password;
    this.favourites = favourites;
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }
  edit() {
    const db = getDb();
    return db
      .collection("users")
      .findOneAndUpdate(
        { email: this.email },
        { $set: { password: this.password, favourites: this.favourites } }
      );
  }
  static find(email) {
    const db = getDb();
    return db.collection("users").find({ email: email }).toArray();
  }
}

module.exports = Users;
