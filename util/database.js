const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;
let uri =
  "mongodb+srv://andrelup:Hiberus2022@cluster0.awtuofy.mongodb.net/characters";
const mongoConnect = (callback) => {
  MongoClient.connect(uri)
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database found!";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
