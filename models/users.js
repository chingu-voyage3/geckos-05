const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    ghId: String,
    name: String,
    avatar_url: String,
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "Project"
    }]
});

UsersSchema.virtual("numOfProjects").get(function () {
    return this.projects.length;
});

//represents entire collection of data
module.exports = mongoose.model("User", UsersSchema);
