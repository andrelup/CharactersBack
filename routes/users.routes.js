const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { verifyToken } = require("../util/auth");

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
router.put("/users/", verifyToken, (req, res, next) => {
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
router.get("/users/:email", verifyToken, (req, res, next) => {
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

module.exports = router;
