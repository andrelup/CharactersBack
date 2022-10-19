const express = require("express");
const router = express.Router();

const charactersController = require("../controllers/characters.controller");
const { verifyToken } = require("../util/auth");

router.get("/characters", verifyToken, charactersController.getCharacters);
router.get("/characters/:id", verifyToken, charactersController.getCharactersById);

module.exports = router;
