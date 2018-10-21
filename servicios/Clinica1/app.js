"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cargar rutas
var specRoutes = require("./Routes/spec_routes");
var sedeRoutes = require("./Routes/sedes_routes");

//configurar cabeceras http

//rutas base
app.use("/spec", specRoutes);
app.use("/sede", sedeRoutes);

module.exports = app;
