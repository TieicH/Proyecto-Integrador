"use strict";

var express = require("express");
var FrutaController = require("../controllers/fruta");

var api = express.Router();

api.get("/fruta", FrutaController.getFrutas);
api.get("/fruta/:nombre", FrutaController.getFrutas);
api.post("/fruta", FrutaController.saveFruta);
api.put("/fruta/:id", FrutaController.updateFruta);
api.delete("/fruta/:id", FrutaController.deleteFruta);

module.exports = api;
