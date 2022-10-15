const express = require("express");
const router = express.Router();

router.get("/characters", (req, res) => {
  res.send("/characters URL Works");
});
router.get("/characters/:id", (req, res) => {
  res.send(" /characters/:id URL Works");
});

module.exports = router;
