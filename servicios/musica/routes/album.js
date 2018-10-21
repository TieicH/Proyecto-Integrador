"use strict";

var express = require("express");
var albumController = require("../controllers/album");
var md_auth = require("../middleWares/authenticated");

var albumApi = express.Router();
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./uploads/albums" });

albumApi.get("/get_album/:id", md_auth.ensureAuth, albumController.getAlbum);
albumApi.get(
  "/get_albums/:artist?",
  md_auth.ensureAuth,
  albumController.getAlbums
);
albumApi.post("/save_album", md_auth.ensureAuth, albumController.saveAlbum);
albumApi.put(
  "/update_album/:id",
  md_auth.ensureAuth,
  albumController.updateAlbum
);
albumApi.delete(
  "/delete_album/:id",
  md_auth.ensureAuth,
  albumController.deleteAlbum
);
albumApi.post(
  "/upimage_album/:id",
  [md_auth.ensureAuth, md_upload],
  albumController.uploadImage
);
albumApi.get("/getimage_album/:imageFile", albumController.getImageFile);

module.exports = albumApi;
