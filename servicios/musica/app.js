"use strict";

var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cargar rutas
var userRoutes = require("./routes/user");
var artistRoutes = require("./routes/artist");
var albumRoutes = require("./routes/album");

//configurar cabeceras http

//rutas base
app.use("/api", userRoutes);
app.use("/artist", artistRoutes);
app.use("/album", albumRoutes);

module.exports = app;
