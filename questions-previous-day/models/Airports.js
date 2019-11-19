const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    name: String,
    country: String,
    location: String,
    creation: Number
  },
  {
    timestamps: true
  }
);

const Model = mongoose.model("Airports", schemaName);
module.exports = Model;
