const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoyagesSchema = new Schema({
  date: String,
  teams: [{
    type: Schema.Types.ObjectId,
    ref: "Team"
  }]
});

module.exports = mongoose.model("Voyage", VoyagesSchema);
