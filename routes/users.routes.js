const express = require("express");
const router = express.Router();
const Users = require("../models/users");
router.post("/users/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const favourites = req.body.favourites;
  const user = new Users(email, password, favourites);
  console.log("User: ", user);
  user
    .save(user)
    .then((userSaved) => {
      console.log("User: ", userSaved);
      res.send(user);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});
router.put("/users/", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const favourites = req.body.favourites;
  console.log("[editUser] favourites: ", favourites);
  console.log("[editUser] password: ", password);
  console.log("[editUser] email: ", email);
  const user = new Users(email, password, favourites);
  user
    .edit(email)
    .then((result) => {
      console.log("User: ", result);
      res.send(user);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});
router.get("/users/:email", (req, res, next) => {
  const email = req.params.email;
  Users.find(email)
    .then((user) => {
      console.log("User: ", user);
      res.send(user);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
      res.status(500).send(error);
    });
});
router.post("/users/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("EMAIL: ", email);
  console.log("PASSWORD: ", password);
  Users.find(email)
    .then((user) => {
      console.log("User: ", user);
      if (user && user.length > 0) {
        if (user[0].password === password) {
          res.send(user[0]);
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
module.exports = router;
