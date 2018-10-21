"use strict";

var Medico = require("../Models/medico_model");

function getMedicos(req, res) {
  Medico.find()
    .populate("spec")
    .populate("sede", ["_id", "name", "direction", "state"])
    .sort("name")
    .exec((err, medicos) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (medicos.length < 1) {
          res.status(404).send({ message: "No se encontraron medicos" });
        } else {
          res.status(200).send({ Medicos: medicos });
        }
      }
    });
}

function getMedicoById(req, res) {
  var medicoId = req.params.id;
  Medico.findById(medicoId)
    .populate("spec")
    .populate("sede", ["_id", "name", "direction", "state"])
    .exec((err, medico) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (medico.length < 1) {
          res.status(404).send({ message: "No se encontró medico" });
        } else {
          res.status(200).send({ Medicos: medico });
        }
      }
    });
}

function getMedicoByName(req, res) {
  var medicoName = req.params.name;
  Medico.find({
    $or: [
      { name: { $regex: medicoName, $options: "i" } },
      { lastname: { $regex: medicoName, $options: "i" } }
    ]
  })
    .populate("spec")
    .populate("sede", ["_id", "name", "direction", "state"])
    .sort("name")
    .exec((err, medico) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (medico.length < 1) {
          res.status(404).send({
            message: "No se encontraron medicos con el nombre " + medicoName
          });
        } else {
          res.status(200).send({ Medicos: medico });
        }
      }
    });
}

function getMedicoBySpec(req, res) {
  var specId = req.params.spec;
  Medico.find({ spec: specId })
    .populate("spec")
    .populate("sede", ["_id", "name", "direction", "state"])
    .sort("spec")
    .exec((err, medicos) => {
      if (err) {
        res.status(500).send({ message: "Error en la petición" });
      } else {
        if (medicos.length < 1) {
          res.status(404).send({ message: "No se encontraron medicos" });
        } else {
          res.status(200).send({ Medicos: medicos });
        }
      }
    });
}

function saveMedico(req, res) {
  var medico = new Medico();
  var params = req.body;
  medico.name = params.name;
  medico.lastname = params.lastname;
  medico.inHouse = params.inHouse;
  medico.state = true;
  medico.spec = params.spec;
  medico.sede = params.sede;
  if (params.lunes) {
    medico.horario.lunes = params.lunes.split(",");
  }
  if (params.martes) {
    medico.horario.martes = params.martes.split(",");
  }
  if (params.miercoles) {
    medico.horario.miercoles = params.miercoles.split(",");
  }
  if (params.jueves) {
    medico.horario.jueves = params.jueves.split(",");
  }
  if (params.viernes) {
    medico.horario.viernes = params.viernes.split(",");
  }
  medico.horario.sabado = false;
  medico.horario.domingo = false;
  console.log(medico);

  medico.save((err, medicoStored) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!medicoStored) {
        res.status(404).send({ message: "No se pudo guardar el médico" });
      } else {
        res.status(200).send({ Medico: medicoStored });
      }
    }
  });
}

function updateMedico(req, res) {
  var medicoId = req.params.id;
  var medicoBody = req.body;
  medicoBody.horario = {
    lunes: req.body.lunes ? req.body.lunes.split(",") : false,
    martes: req.body.martes ? req.body.martes.split(",") : false,
    miercoles: req.body.miercoles ? req.body.miercoles.split(",") : false,
    jueves: req.body.jueves ? req.body.jueves.split(",") : false,
    viernes: req.body.viernes ? req.body.viernes.split(",") : false,
    sabado: false,
    domingo: false
  };

  Medico.findByIdAndUpdate(medicoId, medicoBody, (err, medicoUpdated) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!medicoUpdated) {
        res.status(404).send({ message: "No se pudo actualizar el médico" });
      } else {
        Medico.findById(medicoId, (err, medico) => {
          res
            .status(200)
            .send({ Medico_anterior: medicoUpdated, Medico_nueva: medico });
        });
      }
    }
  });
}

function deleteMedico(req, res) {
  var medicoId = req.params.id;
  Medico.findByIdAndUpdate(medicoId, { state: false }, (err, medicoDelete) => {
    if (err) {
      res.status(500).send({ message: "Error en la petición" });
    } else {
      if (!medicoDelete) {
        res.status(404).send({ message: "No se pudo eliminar el medico" });
      } else {
        Medico.findById(medicoId, (err, medico) => {
          res.status(200).send({ Medico: medico });
        });
      }
    }
  });
}

module.exports = {
  getMedicos,
  getMedicoById,
  getMedicoByName,
  getMedicoBySpec,
  saveMedico,
  updateMedico,
  deleteMedico
};
