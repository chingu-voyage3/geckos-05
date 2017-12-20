const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    upvotes: {
        type: Number,
        default: 0
    }
});

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;