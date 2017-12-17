const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const projectIdea = require("./projectIdea");

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
    projectIdea: [{
        types: Schema.Types.ObjectId,
        ref: 'projectIdea'
    }]
});

userSchema.virtual("numOfProjects").get(function () {
    return this.projectIdea.length;
});

//represetsnts entire collection of data
const User = mongoose.model('user', userSchema);

module.exports = User;