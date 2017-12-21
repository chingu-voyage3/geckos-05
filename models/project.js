const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const team = require("./team");
const user = require("./user");
const voyage = require("./voyage");

const projectSchema = new Schema({
    uniqueId: Schema.Types.ObjectId,
    title: String,
    content: String,
    repo: String,
    demo: String,
    voyage: {
      type: Schema.Types.Number,
      ref: "voyage"
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "team"
    },
    contributors: [{
      type: Schema.Types.String,
      ref: "user"
    }]
});

const project = mongoose.model("project", projectSchema);

module.exports = project;
