const express = require("express");
const mongoConnect = require("./util/database").mongoConnect;
var bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
// import library and files
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
// const customCss = fs.readFileSync((process.cwd() + "/swagger.css"), 'utf8');
// let express to use this
const app = express();
const usersRoutes = require("./routes/users.routes");
const charactersRoutes = require("./routes/characters.routes");
const authRoutes = require("./routes/auth.routes");

app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(usersRoutes);
app.use(charactersRoutes);
app.use(authRoutes);

mongoConnect(() => {
  app.listen(3000);
});
