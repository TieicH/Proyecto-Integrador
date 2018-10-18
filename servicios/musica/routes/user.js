"use strict";

var express = require("express");
var userController = require("../controllers/user");
var md_auth = require("../middleWares/authenticated");

var UserApi = express.Router();
var multipart = require("connect-multiparty");
var md_upload = multipart({ uploadDir: "./uploads/users" });

UserApi.get("/user", md_auth.ensureAuth, userController.pruebas);
UserApi.post("/user", userController.saveUser);
UserApi.post("/loginUser", userController.loginUser);
UserApi.put("/user/:id", md_auth.ensureAuth, userController.updateUser);
UserApi.post(
  "/uploadImageUser/:id",
  [md_auth.ensureAuth, md_upload],
  userController.uploadImage
);
UserApi.get("/getImageUser/:imageFile", userController.getImageFile);

module.exports = UserApi;
