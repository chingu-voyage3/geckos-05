// dependencies
const btoa = require("btoa");
const mongoose = require("mongoose");
const request = require("request");
const uniqid = require("uniqid");
require("dotenv").load();

// local modules
const queryProjects = require("./queryProjects.js");
const saveUsers = require("./saveUsers.js");

// db models
const Project = require("../models/projects.js");
const User = require("../models/users.js");

// api call constants
const API_URL = "https://api.github.com";
const GH_LOGIN = process.env.GH_LOGIN + ":" + process.env.GH_TOKEN;
const USER_AGENT = "ckingbailey";
const headers = {
  "User-Agent": "ckingbailey",
  Authorization: "Basic " + btoa(GH_LOGIN)
};

// command line arguments
const ARGS = process.argv.slice(2);

// wire up database
const DB_URI = process.env.MONGODB_URI;
// MERN tutorial uses { useMongoClient: true } here but mongoose says unsupported
mongoose.connect(DB_URI, err => {
  if (err) throw new Error(err);
});
const db = mongoose.connection;
// I got this 'bind' from MERN tutorial. what does it do?
db.on("error", console.error
  .bind(console, "MongoDB connection error"));

// globals
let counter = 0;

// call gh contributors api for one repo and pass response to cb
// also takes project _id
function fetchUsers(project, fn) {
  // replace gh repo url with repo api contributors url
  const usersURL = project.repo.replace("https://github.com", "https://api.github.com/repos") + "/contributors";
  const req = { url: usersURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
    // if contributors returns a response save each contrib as a new user
    // should I first test for valid JSON? ["Content-Type"] === "application/json"
      if (res.headers["content-type"].includes("application/json")) {
        const json = JSON.parse(body);
        if (Array.isArray(json)) {
          JSON.parse(body).forEach(contributor => {
          // test if user already exists
            User.findOne({ name: contributor.login }, (err, user) => {
              if (err) throw new Error(err);
              else if (user) {
              // test for existence of various props
                const updateUser = {};
                if (!user.ghId) {
                  updateUser.ghId = contributor.id;
                } else if (!user.avatar_url) {
                  updateUser.avatar_url = contributor.avatar_url.slice(0, contributor.avatar_url.indexOf("?"));
                } else if (!user.projects.includes(projectId)) {
                  if (Array.isArray(user.projects)) {
                    updateUser.projects.push(projectId);
                  } else updateUser.projects = [ projectId ];
                } else if (Object.keys(updateUser).length) {
                // if updateUser has received any props, pass it along to callback
                // `false` indicates this is an update to an existing record
                  fn(updateUser, false);
                } else return;
              // if no result from query, instantiate new User object and pass it to cb
              } else {
                const newUser = new User();
                newUser.name = contributor.login;
                newUser._id = uniqid();
                newUser.ghId = contributor.id;
                newUser.avatar_url = contributor.avatar_url.slice(0, contributor.avatar_url.indexOf("?"));
                newUser.projects = [ projectId ];
              // `true` indicates this is a new user record
                fn(newUser, true);
              }
            });
          });
        } else console.log(++counter, "!Array", usersURL, json);
      } else console.log(++counter, "!JSON", res.headers["content-type"], usersURL);
    }
  });
}
