"use strict";

var Sede = require("../Models/sede_model");

function getSedes(req, res) {
  Sede.find()
    .populate({ path: "specs" })
    .sort("name")
    .exec((err, sedes) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (sedes.length < 1) {
          res.status(404).send({ message: "No se encontraron sedes" });
        } else {
          res.status(200).send({ Sedes: sedes });
        }
      }
    });
}

function getSedeById(req, res) {
  if (!req.params.id) {
    res.status(500).send({ message: "Falta id sede" });
    return;
  }
  var sedeId = req.params.id;
  Sede.findById(sedeId, (err, sede) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (sede.length < 1) {
        res.status(404).send({ message: "No se encontró la sede" });
      } else {
        res.status(200).send({ Sede: sede });
      }
    }
  });
}

function getSedeByName(req, res) {
  if (!req.params.name) {
    res.status(500).send({ message: "Falta nombre de la especialidad" });
    return;
  }
  var sedeName = req.params.name;
  Sede.find({ name: { $regex: sedeName, $options: "i" } })
    .sort("name")
    .exec((err, sede) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (spec.length < 1) {
          res.status(404).send({
            message: "No se encontró la especialidad con el nombre " + sedeName
          });
        } else {
          res.status(200).send({ Sede: sede });
        }
      }
    });
}

function saveSede(req, res) {
  var sede = new Sede();
  var params = req.body;
  var specs = req.body.specs.split(",");
  sede.name = params.name;
  sede.direction = params.direction;
  sede.state = true;
  sede.specs = specs;

  sede.save((err, sedeStored) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!sedeStored) {
        res.status(404).send({ message: "No se pudo guardar la sede" });
      } else {
        res.status(200).send({ Sede: sedeStored });
      }
    }
  });
}

function updateSede(req, res) {
  var sedeId = req.params.id;
  var sedeBody = req.body;
  sedeBody.specs = req.body.specs.split(",");

  Sede.findByIdAndUpdate(sedeId, sedeBody, (err, sedeUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!sedeUpdated) {
        res.status(404).send({ message: "No se pudo guardar la sede" });
      } else {
        Sede.findById(sedeId, (err, sede) => {
          res
            .status(200)
            .send({ Sede_anterior: sedeUpdated, Sede_nueva: sede });
        });
      }
    }
  });
}

function deleteSede(req, res) {
  var sedeId = req.params.id;
  Sede.findByIdAndUpdate(sedeId, { state: false }, (err, sedeDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!sedeDeleted) {
        res.status(404).send({ message: "No se pudo eliminar la sede" });
      } else {
        Sede.findById(sedeId, (err, sede) => {
          res.status(200).send({ Sede: sede });
        });
      }
    }
  });
}

module.exports = {
  getSedes,
  getSedeById,
  getSedeByName,
  saveSede,
  updateSede,
  deleteSede
};
