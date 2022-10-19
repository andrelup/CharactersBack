// import libraries
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

// import need files
const mongoConnect = require("./util/database").mongoConnect;
const usersRoutes = require("./routes/users.routes");
const charactersRoutes = require("./routes/characters.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();
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
