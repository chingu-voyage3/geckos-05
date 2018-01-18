const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
        ref: "Project"
    }]
});

userSchema.virtual("numOfProjects").get(function () {
    return this.projects.length;
});

//represents entire collection of data
module.exports = mongoose.model("User", UsersSchema);
