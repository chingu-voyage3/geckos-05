const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const project = require("./project");

const userSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: (name) => {
                return name.length > 4
            },
            message: "Name must be longer than 4 characters"
        },
        required: [true, "Name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: "project"
    }]
});

userSchema.virtual("numOfProjects").get(function () {
    return this.projects.length;
});

//represetsnts entire collection of data
const user = mongoose.model("user", userSchema);

module.exports = user;
