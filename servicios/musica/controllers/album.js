"use strict";

var fs = require("fs");
var path = require("path");
var mongoosePaginate = require("mongoose-pagination");

var Artist = require("../models/artist");
var Album = require("../models/album");
var Song = require("../models/song");

function getAlbum(req, res) {
  var albumId = req.params.id;
  Album.findById(albumId)
    .populate({ path: "artist" })
    .exec((err, album) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor" });
      } else {
        if (album) {
          res.status(200).send({ album });
        } else {
          res.status(404).send({ message: "No se encontraron artistas" });
        }
      }
    });
}

function getAlbums(req, res) {
  var artistId = req.params.artist;

  if (!artistId) {
    var find = Album.find({}).sort("title");
  } else {
    var find = Album.find({ artist: artistId }).sort("year");
  }
  find.populate({ path: "artist" }).exec((err, album) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!album) {
        res.status(404).send({ message: "No se encontró ningun album" });
      } else {
        res.status(404).send({ album });
      }
    }
  });
}

function saveAlbum(req, res) {
  var album = new Album();
  album.title = req.body.title;
  album.description = req.body.description;
  album.year = req.body.year;
  album.image = "null";
  album.artist = req.body.artist;

  album.save((err, albumStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!albumStored) {
        res.status(404).send({ message: "No se pudo guardar el album" });
      } else {
        res.status(201).send({ album: albumStored });
      }
    }
  });
}

function updateAlbum(req, res) {
  var albumId = req.params.id;
  var update = req.body;
  Album.findByIdAndUpdate(albumId, update, (err, updateAlbum) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
    } else {
      if (!updateAlbum) {
        res.status(404).send({ message: "No se pudo actualizar el album" });
      } else {
        res.status(201).send({ album: updateAlbum });
      }
    }
  });
}

function deleteAlbum(req, res) {
  var albumId = req.params.id;
  Album.findByIdAndRemove(albumId, (err, albumRemove) => {
    if (err) {
      res.status(500).send({ message: "error del servidor" });
    } else {
      if (!albumRemove) {
        res.status(404).send({ message: "No se pudo borrar el album" });
      } else {
        Song.find({ album: albumId }).remove((err, songRemove) => {
          if (err) {
            res.status(500).send({ message: "error del servidor" });
          } else {
            if (!songRemove) {
              res.status(404).send({ message: "No se pudo borrar la cancion" });
            } else {
              res.status(200).send({ albumRemove });
            }
          }
        });
      }
    }
  });
}

function uploadImage(req, res) {
  var albumId = req.params.id;
  var filename = "No subido...";
  if (req.files) {
    var filePath = req.files.image.path;
    var fileSplit = filePath.split("/");
    var filename = fileSplit[2];
    var ext = filename.split(".").pop();
    console.log(fileSplit);
    console.log(ext);
    if (ext == "jpg" || ext == "png" || ext == "jpeg") {
      Album.findByIdAndUpdate(
        albumId,
        { image: filename },
        (err, imageUpload) => {
          if (err) {
            res.status(404).send({ message: "No se pudo guardar la imagen" });
          } else {
            Album.findById(albumId, (err, album) => {
              res.status(200).send({ album });
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
  var pathFile = "./uploads/albums/" + imageFile;

  fs.exists(pathFile, exists => {
    if (exists) {
      res.sendFile(path.resolve(pathFile));
    } else {
      res.status(200).send({ message: "La imagen no existe" });
    }
  });
}

module.exports = {
  getAlbum,
  saveAlbum,
  getAlbums,
  updateAlbum,
  deleteAlbum,
  uploadImage,
  getImageFile
};
