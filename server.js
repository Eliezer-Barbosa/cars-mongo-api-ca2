// this is used for building web api
const express = require("express");

// used to parse the requests
const bodyParser = require("body-parser");

// cross-origin-resource-server to allow
// the request coming from localhost and heroku
const cors = require("cors");

// dotenv
require('dotenv').config()

const app = express();

var corsOptions = {
  // this will be the port where the angular app will run
  origin: process.env.ORIGIN_CLIENT_ALLOWED
};

app.use(cors(corsOptions));

// the content-type will be application/json
app.use(bodyParser.json());

// alse the content-type of application/x-www-form-urlencoded for the url
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// testing the api with a get request
app.get("/", (req, res) => {
  res.json({ message: "Hello World! - " + process.env.MY_NAME });
});

require("./app/routes/car.routes")(app);

// this server will run on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`${process.env.MY_NAME}, Server is running on port ${PORT}.`);
});