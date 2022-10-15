const getDb = require("../util/database").getDb;

class Users {
  constructor(email, password, favourites) {
    this.email = email;
    this.password = password;
    this.favourites = favourites;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  edit() {
    const db = getDb();
    return db.collection("users").findOneAndUpdate({ email: this.email }, this);
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
  static find(email) {
    console.log("EMAIL: ", email);
    const db = getDb();
    return db
      .collection("users")
      .find({ email: email })
      .toArray()
      .then((user) => {
        console.log(user);
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Users;
