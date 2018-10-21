"use strict";

var express = require("express");
var artistController = require("../controllers/artist");
var md_auth = require("../middleWares/authenticated");

var artistApi = express.Router();
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./uploads/artists" });

artistApi.get(
  "/get_artist/:id",
  md_auth.ensureAuth,
  artistController.getArtist
);
artistApi.post("/save_artist", artistController.saveArtist);
artistApi.get(
  "/get_artists/:page?",
  md_auth.ensureAuth,
  artistController.getArtists
);
artistApi.put("/put_artists/:id", artistController.updateArtist);
artistApi.delete(
  "/delete_artists/:id",
  md_auth.ensureAuth,
  artistController.deleteArtist
);
artistApi.post(
  "/uploadImageArtist/:id",
  [md_auth.ensureAuth, md_upload],
  artistController.uploadImage
);
artistApi.get("/getImageArtist/:imageFile", artistController.getImageFile);

module.exports = artistApi;
