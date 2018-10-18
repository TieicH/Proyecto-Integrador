"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3001;

mongoose.connect(
  "mongodb://localhost:27017/pseudoSpotify",
  { useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      app.listen(port, () => {
        console.log("Servidor corriendo en el puerto: " + port);
      });
    }
  }
);
