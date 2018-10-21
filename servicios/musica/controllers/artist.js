"use strict";

var fs = require("fs");
var path = require("path");
var mongoosePaginate = require("mongoose-pagination");

var Artist = require("../models/artist");
var Album = require("../models/album");
var Song = require("../models/song");

function getArtist(req, res) {
  var artistId = req.params.id;
  Artist.findById(artistId, (err, artist) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (artist) {
        res.status(200).send({ artist });
      } else {
        res.status(404).send({ message: "No se encontraron artistas" });
      }
    }
  });
}

function getArtists(req, res) {
  var page = req.params.page || 1;
  var itemsPerPage = 3;

  Artist.find()
    .sort("name")
    .paginate(page, itemsPerPage, (err, artists, total) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor" });
      } else {
        if (!artists) {
          res.status(404).send({ message: "No se encontraron artistas" });
        } else {
          return res.status(200).send({ total: total, artists: artists });
        }
      }
    });
}

function saveArtist(req, res) {
  var artist = new Artist();
  var params = req.body;
  artist.name = params.name;
  artist.description = params.description;
  artist.image = "null";
  var horarioLunes = req.body.lunes.split(",");
  artist.horario.lunes = horarioLunes;

  artist.save((err, artistStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!artistStored) {
        res.status(404).send({ message: "El artista no se pudo guardar" });
      } else {
        res.status(200).send({ artist: artistStored });
      }
    }
  });
}

function updateArtist(req, res) {
  var artistId = req.params.id;
  req.body.horario = { lunes: req.body.lunes.split(",") };
  var artistBody = req.body;
  console.log(artistBody);
  Artist.findByIdAndUpdate(artistId, artistBody, (err, artistUpdated) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!artistUpdated) {
        res.status(404).send({ message: "No se actualizo el artista" });
      } else {
        res.status(201).send({ artist: artistUpdated });
      }
    }
  });
}

function deleteArtist(req, res) {
  var artistId = req.params.id;
  Artist.findByIdAndRemove(artistId, (err, artisRemove) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!artisRemove) {
        res.status(404).send({ message: "No se pudo eliminar el artista" });
      } else {
        Album.find({ artist: artisRemove._id }).remove((err, albumRemove) => {
          if (err) {
            res.status(500).send({ message: "error del servidor" });
          } else {
            if (!albumRemove) {
              res.status(404).send({ message: "No se pudo borrar el album" });
            } else {
              Song.find({ album: albumRemove._id }).remove(
                (err, songRemove) => {
                  if (err) {
                    res.status(500).send({ message: "error del servidor" });
                  } else {
                    if (!songRemove) {
                      res
                        .status(404)
                        .send({ message: "No se pudo borrar la cancion" });
                    } else {
                      res.status(200).send({ artisRemove });
                    }
                  }
                }
              );
            }
          }
        });
      }
    }
  });
}

function uploadImage(req, res) {
  var artistId = req.params.id;
  var filename = "No subido...";
  if (req.files) {
    var filePath = req.files.image.path;
    var fileSplit = filePath.split("/");
    var filename = fileSplit[2];
    var ext = filename.split(".").pop();
    console.log(fileSplit);
    console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "jpeg") {
      Artist.findByIdAndUpdate(
        artistId,
        { image: filename },
        (err, imageUpload) => {
          if (err) {
            res.status(404).send({ message: "No se pudo guardar la imagen" });
          } else {
            Artist.findById(artistId, (err, artist) => {
              res.status(200).send({ artist });
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
  var pathFile = "./uploads/artists/" + imageFile;

  fs.exists(pathFile, exists => {
    if (exists) {
      res.sendFile(path.resolve(pathFile));
    } else {
      res.status(200).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  getArtist,
  saveArtist,
  getArtists,
  updateArtist,
  deleteArtist,
  uploadImage,
  getImageFile
};
