// dependencies
const btoa = require("btoa");
const mongoose = require("mongoose");
const request = require("request");
const uniqid = require("uniqid");
require("dotenv").load();

// db models
const Project = require("../models/projects.js");
const User = require("../models/users.js");

// api call constants
const API_URL = "https://api.github.com";
const GH_LOGIN = process.env.GH_LOGIN + ":" + process.env.GH_TOKEN;
// const ARGS = process.argv.slice(2);
const USER_AGENT = "ckingbailey";
// const VOYAGE_NAME = ARGS.filter(arg => {
//     return !arg.includes("=")
//   }).join("") || "chingu-coders";
// const OPTIONS = ARGS.filter(arg => {
//     return arg.includes("=")
//   }).join("") && "?" + ARGS.filter(arg => {
//     return arg.includes("=");
//   }).join("&");
// const REQ_URL = `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`;
const headers = {
  "User-Agent": "ckingbailey",
  Authorization: "Basic " + btoa(GH_LOGIN)
};

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

queryProjects((url, id) => {
  fetchUsers(url, id, (user, bool) => {
    if (bool) console.log("new user: ", user);
    else console.log("existing user: ", user);
  });
});

// find all projects
function queryProjects(fn) {
  Project.find({ "voyage": 2 }, (err, projects) => {
    if (err) {
      console.error(err);
    }
    else {
    // iterate over each project, passing its gh contributors api url to callback
      what(projects.length);
      projects.forEach(proj => {
      // replace repo url with gh api url for repo
        const api_url = proj.repo.replace("https://github.com", "https://api.github.com/repos") + "/contributors";
      // also pass project _id to cb
        fn(api_url, proj._id);
      })
    }
  });
}

// call gh contributors api for one repo and pass response to cb
// also takes project _id
function fetchUsers(usersURL, projectId, fn) {
  // can I declare this outside these fns so I don't have to repeat myself?
  const req = { url: usersURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
    // if contributors returns a response save each contrib as a new user
    // should I first test for valid JSON? ["Content-Type"] === "application/json"
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
        })
      })
    }
  });
}

function saveUser(userObj, isNewUser) {
  if (isNewUser) {
    userObj.save((err, newUserRecord) => {
      if (err) {
        console.error(err);
      }
      else console.log("user record created:\n", newUserRecord);
    });
  } else userObj.update(userObj, (err, raw) => {
    if (err) console.error(err);
    else console.log("user record updated:\n", raw);
  });
}

// NOTE: this fcn is currently unnecessary
// call gh repo api for one repo and pass response to a cb
// also takes project _id
function fetchRepo(repoURL, id, fn) {
  const req = { url: repoURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
    // pass whole repo response to callback
    // should I check that it's valid JSON first?
      fn(JSON.parse(body).contributors_url);
    }
  });
}
