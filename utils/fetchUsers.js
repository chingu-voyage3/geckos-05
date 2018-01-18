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
mongoose.connect(DB_URI);
const db = mongoose.connection;
// I got this 'bind' from MERN tutorial. what does it do?
db.on("error", console.error
  .bind(console, "MongoDB connection error"));

function queryProjects(fn) {
  Project.find({ "voyage": 2 }, (err, projects) => {
    if (err) {
      console.error(err);
    }
    else {
      projects.forEach(proj => {
        const api_url = proj.repo.replace("https://", "https://api.").replace("github.com", "github.com/repos");
        fn(api_url);
      })
    }
  });
}

function fetchRepo(repoURL, fn) {
  const req = { url: repoURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
      fn(JSON.parse(body).contributors_url);
    }
  });
}

function fetchUsers(usersURL, fn) {
  const req = { url: usersURL, headers };
  request.get(req, (err, res, body) => {
    if (err) {
      console.error(err);
    }
    else {
    // if contributors returns a response
    // save each contrib as a new user
      JSON.parse(body).forEach(contributor => {
        const user = new User();
        user.name = contributor.login;
        user._id = uniqid();
        user.ghId = contributor.id;
        user.avatar_url = contributor.avatar_url;
        user.projects;
        fn(user.avatar_url);
      })
    }
  });
}

function saveAvatar(avatarURL) {
  user.avatar_url = avatarURL;
}
