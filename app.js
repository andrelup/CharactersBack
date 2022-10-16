const express = require("express");
const mongoConnect = require("./util/database").mongoConnect;
var bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const usersRoutes = require("./routes/users.routes");
const charactersRoutes = require("./routes/characters.routes");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(usersRoutes);
app.use(charactersRoutes);

mongoConnect(() => {
  app.listen(3000);
});
