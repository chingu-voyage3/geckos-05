const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectIdeaSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
});

const projectIdea = mongoose.model("projectIdea", projectIdeaSchema);

module.exports = projectIdea;
