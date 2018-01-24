const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Voyage = require("./voyages.js");

const ProjectsSchema = new Schema({
    ghId: String,
    name: String,
    description: String,
    repo: String,
    demo: String,
    tech_stack: [ String ],
    tags: [ String ],
    voyage: {
      type: Schema.Types.ObjectId,
      ref: "Voyage"
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team"
    },
    contributors: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
});

module.exports = mongoose.model("Project", ProjectsSchema);
