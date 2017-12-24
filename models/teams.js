const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamsSchema = new Schema({
  uniqueId: Schema.Types.ObjectId,
  name: String,
  voyage: {
    type: Schema.Types.ObjectId,
    ref: "Voyage"
  }
});

module.exports = mongoose.model("Team", TeamsSchema);
