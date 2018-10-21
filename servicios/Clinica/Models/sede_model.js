"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SedeSchema = new Schema(
  {
    name: String,
    direction: String,
    specs: [{ type: Schema.Types.ObjectId, ref: "Spec" }],
    state: Boolean
  },
  { versionKey: false }
);

module.exports = mongoose.model("Sede", SedeSchema);
