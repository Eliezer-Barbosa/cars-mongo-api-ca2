// this is used for building web api
const express = require("express");

// used to parse the requests
const bodyParser = require("body-parser");

// cross-origin-resource-server to allow
// the request coming from localhost and heroku
const cors = require("cors");

const app = express();

var corsOptions = {
  // this will be the port where the angular app will run
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// the content-type will be application/json
app.use(bodyParser.json());

// alse the content-type of application/x-www-form-urlencoded for the url
app.use(bodyParser.urlencoded({ extended: true }));

// testing the api with a get request
app.get("/", (req, res) => {
  res.json({ message: "Hello World! - Eliezer" });
});

// this server will run on port 8080
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});