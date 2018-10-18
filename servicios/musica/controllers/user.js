"use strict";

var User = require("../models/user");
var bcrypt = require("bcrypt-nodejs");
var jwt = require("../services/jwt");
var fs = require("fs");
var path = require("path");

function pruebas(req, res) {
  console.log("estoy dentro del controlador", req.user);
  User.find({}).exec((err, users) => {
    res.status(200).send({ users: users });
  });
}

function saveUser(req, res) {
  var user = new User();
  var params = req.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;
  user.role = "ROLE_ADMIN";
  user.imagen = "null";

  if (params.password) {
    bcrypt.hash(params.password, null, null, (err, hash) => {
      //encripto contraseña
      user.password = hash;
      if (user.name != null && user.surname != null && user.email != null) {
        //guardo datos
        user.save((err, userStored) => {
          if (err) {
            res.status(500).send({ message: "Error al guardar el usuario" });
          } else {
            if (!userStored) {
              res.status(404).send({ message: "No se registro el usuario" });
            } else {
              res.status(200).send({ user: userStored });
            }
          }
        });
      } else {
        res.status(200).send({ message: "Introduce todos los campos" });
      }
    });
  } else {
    res.status(200).send({ message: "Introduce la contraseña" });
  }
}

function loginUser(req, res) {
  var params = req.body;
  var email = params.email;
  var password = params.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) {
      //error servidor
      res.status(500).send("Error en el servidor");
    } else {
      if (!user) {
        //no exite usuario
        res.status(404).send({ message: "El usuarios no existe" });
      } else {
        //comparar la contraseña
        bcrypt.compare(password, user.password, (err, check) => {
          if (check) {
            if (params.getHash) {
              res.status(200).send({
                token: jwt.createToken(User)
              });
            } else {
              res.status(200).send({ user });
            }
          } else {
            res
              .status(404)
              .send({ message: "el usuario no ha podido logearse" });
          }
        });
      }
    }
  });
}

function updateUser(req, res) {
  var userId = req.params.id;
  var update = req.body;

  User.findOneAndUpdate(userId, update, (err, UserUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error al actualizar el usuario" });
    } else {
      if (!UserUpdate) {
        res
          .status(404)
          .send({ message: "No se ah podido actualizar le usuario" });
      } else {
        User.findOne({ _id: userId }, (err, user) => {
          res.status(200).send({ user });
        });
      }
    }
  });
}

function uploadImage(req, res) {
  var userId = req.params.id;
  var filename = "No subido...";
  if (req.files) {
    var filePath = req.files.image.path;
    var fileSplit = filePath.split("/");
    var filename = fileSplit[2];
    var ext = filename.split(".").pop();
    console.log(fileSplit);
    console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "jpeg") {
      User.findByIdAndUpdate(
        userId,
        { imagen: filename },
        (err, imageUpload) => {
          if (err) {
            res.status(404).send({ message: "No se pudo guardar la imagen" });
          } else {
            User.findById(userId, (err, user) => {
              res.status(200).send({ user });
            });
          }
        }
      );
    } else {
      res.status(200).send({ message: "Formato de imagen no permitido" });
    }
  } else {
    res.status(200).send({ message: "La imagen no se pudo subir" });
  }
}

function getImageFile(req, res) {
  var imageFile = req.params.imageFile;
  // la ruta hace referencia a app.js
  var pathFile = "./uploads/users/" + imageFile;

  fs.exists(pathFile, exists => {
    if (exists) {
      res.sendFile(path.resolve(pathFile));
    } else {
      res.status(200).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  pruebas,
  saveUser,
  loginUser,
  updateUser,
  uploadImage,
  getImageFile
};
