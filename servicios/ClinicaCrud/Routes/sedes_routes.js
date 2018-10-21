"use strict";

var express = require("express");
var sedeController = require("../Controllers/sede_controller");

var sedeApi = express.Router();

sedeApi.get("/getSedes", sedeController.getSedes);
sedeApi.get("/getSedeById/:id", sedeController.getSedeById);
sedeApi.get("/getSedeByName/:name", sedeController.getSedeByName);
sedeApi.post("/saveSede", sedeController.saveSede);
sedeApi.put("/updateSede/:id", sedeController.updateSede);
sedeApi.put("/deleteSede/:id", sedeController.deleteSede);

module.exports = sedeApi;
