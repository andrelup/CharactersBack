const express = require("express");
const app = express();
const usersRoutes = require("./routes/users.routes");
const charactersRoutes = require("./routes/characters.routes");

app.use(usersRoutes);
app.use(charactersRoutes);

app.listen(3000);
