"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SpecSchema = new Schema(
  {
    name: String,
    description: String
  },
  { versionKey: false }
);

module.exports = mongoose.model("Spec", SpecSchema);
