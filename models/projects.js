const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Teams = require("./team");
const Users = require("./user");
const Voyages = require("./voyage");

const ProjectsSchema = new Schema({
    uniqueId: Schema.Types.ObjectId,
    title: String,
    content: String,
    repo: String,
    demo: String,
    voyage: {
      type: Schema.Types.Number,
      ref: "Voyage"
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    contributors: [{
      type: Schema.Types.String,
      ref: "User"
    }]
});

module.exports = mongoose.model("Project", ProjectsSchema);
