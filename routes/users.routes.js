const express = require("express");
const router = express.Router();

router.post("/users/login", (req, res) => {
  res.send("/users/login URL Works");
});
router.put("/users/:id", (req, res) => {
  res.send("/users/:id URL Works");
});

module.exports = router;
