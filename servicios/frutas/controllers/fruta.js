"use strict";

var Fruta = require("../models/fruta");

function getFrutas(req, res) {
  var params = req.params;
  if (params.nombre) {
    Fruta.find({ nombre: params.nombre }).exec((err, Frutas) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (Frutas.length > 0) {
          res.status(200).send({ Frutas });
        } else {
          res
            .status(404)
            .send({ message: `No hay frutas con el nombre: ${params.nombre}` });
        }
      }
    });
  } else {
    Fruta.find({}).exec((err, Frutas) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        res.status(200).send({ Frutas });
      }
    });
  }
}

function saveFruta(req, res) {
  var fruta = new Fruta();
  var params = req.body;

  if (params.nombre) {
    fruta.nombre = params.nombre;
    fruta.color = params.color;
    fruta.temporada = params.temporada;

    fruta.save((err, frutaStored) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (frutaStored) {
          res.status(201).send({ fruta: frutaStored });
        } else {
          res.status(200).send({ message: "No se pudo guardar la fruta" });
        }
      }
    });
  } else {
    res.status(200).send({ message: "El nombre de la fruta es obligatorio" });
  }
}

function updateFruta(req, res) {
  var frutaID = req.params.id;
  var update = req.body;
  Fruta.findByIdAndUpdate(
    frutaID,
    update,
    { new: true },
    (err, frutaUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (frutaUpdate) {
          res.status(200).send({ fruta: frutaUpdate });
        } else {
          res.status(404).send({ message: `No existe la fruta` });
        }
      }
    }
  );
}

function deleteFruta(req, res) {
  var frutaid = req.params.id;
  Fruta.findByIdAndRemove(frutaid, (err, frutaRemove) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (frutaRemove) {
        res.status(200).send({ frutaRemove });
      } else {
        res.status(404).send({ message: `No existe la fruta` });
      }
    }
  });
}

module.exports = {
  getFrutas,
  saveFruta,
  updateFruta,
  deleteFruta
};
