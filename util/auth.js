jwt = require("jsonwebtoken");

const Users = require("../models/users");
const tokenPassword = "Hiberus2022";

const verifyToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(403);
  jwt.verify(token, tokenPassword, (err, userId) => {
    if (err) {
      console.log('[verifyToken] ERROR: ', err);
      return res.sendStatus(404);
    }
    next();
  });
};

const createToken = function (user) {
  return new Promise((resolve, reject) => {
    //This. token will be expire in two hours
    jwt.sign({ id: user._id }, tokenPassword, { expiresIn: 4 * 60 * 60 }, (err, token) => {
      if (err) {
        console.log("[createToken] ERROR: ", err);
        reject({ ERROR: err });
      } else {
        resolve(token);
      }
    });
  });
};

exports.verifyToken = verifyToken;
exports.createToken = createToken;
