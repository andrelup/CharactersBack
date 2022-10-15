const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/users/:email", (req, res, next) => {
  const email = req.params.email;
  Users.find(email)
    .then((user) => {
      console.log("User: ", user);
      res.send(user);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
});
router.post("/users/login", (req, res, next) => {
  console.log("BODY: ", req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log("EMAIL: ", email);
  console.log("PASSWORD: ", password);
  Users.find(email)
    .then((user) => {
      console.log("User: ", user);
      if (user && user.length > 0) {
        if (user[0].password === password) {
          res.send("OK login authorized");
        } else {
          res.status(401).send("Email or password incorrect");
        }
      } else {
        res.status(401).send("Email or password incorrect");
      }
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
});
module.exports = router;
