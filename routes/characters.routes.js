const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/characters", async (req, res) => {
  let queryParams = req.query;
  let url = new URL("https://rickandmortyapi.com/api/character");
  if (queryParams) {
    console.log("[characters] queryParams: ", queryParams);
    Object.keys(queryParams).forEach((key) =>
      url.searchParams.append(key, queryParams[key])
    );
  }
  // console.log("URL: ", url);
  fetch(url, {
    method: "GET",
    queryParams: queryParams,
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((text) => {
      res.send(text);
    });
});
router.get("/characters/:id", (req, res) => {
  const id = req.params.id;
  fetch("https://rickandmortyapi.com/api/character/" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.text())
    .then((text) => {
      console.log("GET character by id: ", text);
      res.send(text);
    });
});

module.exports = router;
