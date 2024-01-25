const express = require("express");
const mustacheExpress = require("mustache-express");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..") + "/.env" });

const cookieParser = require('cookie-parser');

const colors = require("./miscellaneous");
const connectionDataBase = require("./mysql");

const app = express();

app.use(express.static(path.join(__dirname, "..") + "/public"));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cookieParser());

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "..") + "/views");

module.exports = {
  app: app,
};
