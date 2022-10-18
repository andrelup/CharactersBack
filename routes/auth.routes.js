jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { verifyToken, createToken } = require("../util/auth");
const tokenPassword = "Hiberus2022";

router.post("/auth/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("EMAIL: ", email);
  console.log("PASSWORD: ", password);
  Users.find(email)
    .then((user) => {
      console.log("User: ", user);
      if (user && user.length > 0) {
        if (user[0].password === password) {
          createToken(user[0])
            .then((token) => {
              res.send({ message: "Authorized", user: user[0], token: token });
            })
            .catch((err) => {
              console.log("[login.createToken] ERROR: ", err);
              res.status(401).send({ message: "Unauthorized" });
            });
        } else {
          res.status(401).send({ message: "Email or password incorrect" });
        }
      } else {
        res.status(401).send({ message: "Email or password incorrect" });
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});

router.post("/auth/verify", verifyToken);

module.exports = router;
