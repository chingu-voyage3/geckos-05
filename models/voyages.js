const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoyagesSchema = new Schema({
  number: Number,
  date: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }]
  projects: [{
    type: Schema.Types.ObjectId,
    ref: "Project"
  }]
});

module.exports = mongoose.model("Voyage", VoyagesSchema);
