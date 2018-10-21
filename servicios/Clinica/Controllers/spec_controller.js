"use strict";

var Spec = require("../Models/spec_model");

function getSpecs(req, res) {
  Spec.find()
    .sort("name")
    .exec((err, specs) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (specs.length < 1) {
          res.status(404).send({ message: "No se encontraron especialidades" });
        } else {
          res.status(200).send({ Especialidad: specs });
        }
      }
    });
}

function getSpecById(req, res) {
  if (!req.params.id) {
    res.status(500).send({ message: "Falta id de especialidad" });
    return;
  }
  var specId = req.params.id;
  Spec.findById(specId, (err, spec) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (spec.length < 1) {
        res.status(404).send({ message: "No se encontró la especialidad" });
      } else {
        res.status(200).send({ Especialidad: spec });
      }
    }
  });
}

function getSpecByName(req, res) {
  if (!req.params.name) {
    res.status(500).send({ message: "Falta nombre de la especialidad" });
    return;
  }
  var specName = req.params.name;
  Spec.find({ name: { $regex: specName, $options: "i" } })
    .sort("name")
    .exec((err, spec) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (spec.length < 1) {
          res.status(404).send({
            message: "No se encontró la especialidad con el nombre " + specName
          });
        } else {
          res.status(200).send({ Especialidad: spec });
        }
      }
    });
}

function saveSpec(req, res) {
  var spec = new Spec();
  var params = req.body;
  spec.name = params.name;
  spec.description = params.description;

  spec.save((err, specStored) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!specStored) {
        res.status(404).send({ message: "No se pudo guardar la especialidad" });
      } else {
        res.status(200).send({ Especialidad: specStored });
      }
    }
  });
}

function updateSpec(req, res) {
  if (!req.params.id) {
    res.status(500).send({ message: "Falta id de especialidad" });
    return;
  }
  var specId = req.params.id;
  var specBody = req.body;
  Spec.findByIdAndUpdate(specId, specBody, (err, specUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!specUpdated) {
        res
          .status(404)
          .send({ message: "No se pudo actualizar la especialidad" });
      } else {
        Spec.findById(specId, (err, spec) => {
          res.status(200).send({
            Especialidad_anterior: specUpdated,
            Especialidad_nueva: spec
          });
        });
      }
    }
  });
}

function deleteSpec(req, res) {
  if (!req.params.id) {
    res.status(500).send({ message: "Falta id de especialidad" });
    return;
  }
  var specId = req.params.id;
  Spec.findByIdAndRemove(specId, (err, specDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!specDeleted) {
        res
          .status(404)
          .send({ message: "No se pudo Eliminar la especialidad" });
      } else {
        res.status(200).send({
          "Especialidad eliminada": specDeleted
        });
      }
    }
  });
}

module.exports = {
  getSpecs,
  getSpecById,
  getSpecByName,
  saveSpec,
  updateSpec,
  deleteSpec
};
