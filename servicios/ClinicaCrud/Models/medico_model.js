"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MedicoSchema = new Schema(
  {
    name: String,
    lastname: String,
    sede: { type: Schema.Types.ObjectId, ref: "Sede" },
    spec: { type: Schema.Types.ObjectId, ref: "Spec" },
    horario: {
      lunes: { type: Schema.Types.Mixed, default: false },
      martes: { type: Schema.Types.Mixed, default: false },
      miercoles: { type: Schema.Types.Mixed, default: false },
      jueves: { type: Schema.Types.Mixed, default: false },
      viernes: { type: Schema.Types.Mixed, default: false },
      sabado: { type: Schema.Types.Mixed, default: false },
      domingo: { type: Schema.Types.Mixed, default: false }
    },
    inHouse: Boolean,
    state: Boolean
  },
  { versionKey: false }
);

module.exports = mongoose.model("Medico", MedicoSchema);
