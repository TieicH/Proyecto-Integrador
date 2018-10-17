"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3001;

mongoose
  .connect(
    "mongodb://localhost:27017/bd_server",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port, () => {
      console.log("servidor conectado");
    });
  })
  .catch(() => {
    console.error("error");
  });
