"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cargar rutas
var userRoutes = require("./routes/user");

//configurar cabeceras http

//rutas base
app.use("/api", userRoutes);

module.exports = app;
