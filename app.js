const express = require("express");
const app = express();
const mongoConnect = require("./util/database").mongoConnect;
var bodyParser = require("body-parser");

const usersRoutes = require("./routes/users.routes");
const charactersRoutes = require("./routes/characters.routes");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(usersRoutes);
app.use(charactersRoutes);

// app.listen(3000);
mongoConnect(() => {
  app.listen(3000);
});
