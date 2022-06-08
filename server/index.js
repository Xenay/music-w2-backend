const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("./user/config/db");

const app = express();

//configure database and mongoose

mongoose
  .connect(config.database, { useNewUrlParser: true })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log({ database_error: err });
  });

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(morgan("dev"));
app.get("/", (req, res) => {
  console.log("...");
});

const posts = require("./routes/api/posts");

const userRoutes = require("./user/route/user"); //bring in our user routes

app.use("/user", userRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port ${port} "));
