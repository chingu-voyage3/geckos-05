const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const project = require("./project");
const team = require("./team");

const voyageSchema = new Schema({
  number: Number,
  date: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "team"
  }]
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "project"
  }]
});

const voyage = mongoose.model("voyage", voyageSchema);

module.exports = voyage;
