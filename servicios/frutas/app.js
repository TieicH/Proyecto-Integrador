"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var frutas_routers = require("./routes/fruta");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rutas

app.use("/api", frutas_routers);

module.exports = app;
