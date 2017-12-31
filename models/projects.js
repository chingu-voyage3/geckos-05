const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectsSchema = new Schema({
    _id: Schema.Types.ObjectId,
    ghId: String,
    name: String,
    description: String,
    repo: String,
    demo: String,
    tech_stack: [ String ],
    tags: [ String ],
    voyage: {
      num: Schema.Types.Number,
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
