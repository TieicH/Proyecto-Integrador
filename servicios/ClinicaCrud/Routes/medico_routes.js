"use strict";

var express = require("express");
var medicoController = require("../Controllers/medico_controller");

var medicoApi = express.Router();

medicoApi.get("/getMedicos", medicoController.getMedicos);
medicoApi.get("/getMedicoById/:id", medicoController.getMedicoById);
medicoApi.get("/getMedicoByName/:name", medicoController.getMedicoByName);
medicoApi.get("/getMedicoBySpec/:spec", medicoController.getMedicoBySpec);
medicoApi.post("/saveMedico", medicoController.saveMedico);
medicoApi.put("/updateMedico/:id", medicoController.updateMedico);
medicoApi.put("/deleteMedico/:id", medicoController.deleteMedico);

module.exports = medicoApi;
