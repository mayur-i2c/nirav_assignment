require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const handleErrors = require("./middlewares/handleErrors");
const logger = require("./config/logger");
const { dbConnection } = require("./config/db/server");


// Database connections
dbConnection();

// importing main Router file
const mainRouter = require("./router/mainRouter");

app.use(express.json());
app.use(morgan("tiny"));

app.use(mainRouter);

app.use(handleErrors);

app.get("/", (req, res) => {
  res.send(`server start`);
});

app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(process.env.PORT, () => {
  logger.info("Listening on port " + process.env.PORT || 3000);
});
