const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  uniqueId: Schema.Types.ObjectId,
  name: String,
  voyage: {
    type: Schema.Types.ObjectId,
    ref: "voyage"
  }
});

const team = mongoose.model("team", teamSchema);

module.exports = team;
