"use strict";

var express = require("express");
var specController = require("../Controllers/spec_controller");

var specApi = express.Router();

specApi.get("/getSpecs", specController.getSpecs);
specApi.get("/getSpecById/:id", specController.getSpecById);
specApi.get("/getSpecByName/:name", specController.getSpecByName);
specApi.post("/saveSpec", specController.saveSpec);
specApi.put("/updateSpec/:id", specController.updateSpec);
specApi.delete("/deleteSpec/:id", specController.deleteSpec);

module.exports = specApi;
