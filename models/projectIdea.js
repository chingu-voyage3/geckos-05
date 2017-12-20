const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectIdeaSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }],
    upvotes: {
        type: Number,
        default: 0,
        required: true
    }
});

const projectIdea = mongoose.model("projectIdea", projectIdeaSchema);

module.exports = projectIdea;
