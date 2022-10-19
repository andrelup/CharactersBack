const express = require("express");
const router = express.Router();

const { verifyToken } = require("../util/auth");
const usersController = require("../controllers/users.controller");

router.post("/users/", usersController.postUser);
router.put("/users/", verifyToken, usersController.putUser);
router.get("/users/:email", verifyToken, usersController.getUser);

module.exports = router;
