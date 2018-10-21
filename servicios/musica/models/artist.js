"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: String,
  description: String,
  image: String,
  horario: {
    lunes: Array,
    martes: Array,
    miercoles: Array,
    jueves: Array,
    viernes: Array
  }
});

module.exports = mongoose.model("Artist", ArtistSchema);
