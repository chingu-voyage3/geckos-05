const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: String,
    name: String,
    avatar_url: String,
    projects: [{
        type: String,
        ref: "Project"
    }]
});

userSchema.virtual("numOfProjects").get(function () {
    return this.projects.length;
});

//represents entire collection of data
module.exports = mongoose.model("User", UsersSchema);
