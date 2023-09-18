const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const route = require("./routes");
const { emit } = require("process");

const connection = require("./configs/connectSolFive");

// connection.connect();
// notification.getNotification({ id: 1, offset: 3 }, () => {});
var cors = require("cors");
require("dotenv").config();

var bodyParser = require("body-parser");

//global state
global.port = 5012;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Cors config
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/", (req, res) => {
  res.send(
    `<div style = "box-sizing: border-box;font-family: 'Source Code Pro', monospace; height: 90vh;display: flex;align-items: center;justify-content: center;" = >This is SongMusic Server</div>`
  );
});

route(app);

server.listen(port, () => {
  console.log("-> Start success: Solfive server is listening on port", port);
});
