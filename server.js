"use strict"

// dependencies
const express = require("express");
const app = express();
const crypto = require("crypto-random-string");
const mongoose = require("mongoose");
const path = require("path");
const request = require("request");
const router = express.Router();

// models
const Project = require("./models/projects.js");

// load local env vars only in development env
if (process.env.NODE_ENV !== "production") {
  require('dotenv').load()
}

// env vars
const PORT = process.env.NODE_ENV !== "production" ?
  (process.env.API_PORT || 3001) : process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;
const GH_CLIENT_ID = process.env.GH_CLIENT_ID;

// wire up database
mongoose.connect(MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// allow any origin for any route
// TODO: I think I could change this is something more specific
app.use("/", (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
})

// tutorial says "Priority serve any static files"
// does this not do the same as get("*", callback => sendFile("<react-stuff>"))?
// app.use(express.static(path.resolve(__dirname, "react-ui/build")));

// login flow
app.get("/login", (req, res) => {
  const view = req.query.view && req.query.view;
  const state = crypto(16);
  const ghLoginURI = `https://github.com/login/oauth/authorize?client_id=${GH_CLIENT_ID}&state=${state}`;
  // if request comes w/ `view` param, send request to gh
  if (view) {
    console.log(ghLoginURI);
    request(ghLoginURI, (err, httpRes, body) => {
      if (err) {
        throw new Error(err);
      }
      else res.send(body);
    });
  }
});

// api routes
router.get("/", (req, res) => {
  res.send("api initialized")
});

// CRUD methods for projects api
router.route("/projects")
  .get((req, res) => {
    Project.find({ "voyage": 2 }, (err, projects) => {
      if (err) {
        res.send(err);
      }
      else {
        res.set("Content-Type", "application/json");
        res.json(projects);
      }
    });
  })
  .post((req, res) => {
    if (!req.body._id) {
      // create a new object
      const project = new Project();
      console.log(project, req.body);
      // project = { ...project, ...req.body };
      // project.save(err => {
      //   if (err) { console.error(err) }
      //   else console.log(`created project record: ${project}`)
      // })
    } else {
      // project record exists, this is an edit

    }
  });

// use above router config for calls to /api
app.use("/api", router);

// All remaining unhandled requests return the React app
// TODO: put error handling in here so I know where something's gone wrong when it goes wrong
// BUG: if "/" serves all sub-paths, how to restrict sub-paths and serve _only_ route "/"
app.get("/", (req, res) => {
  const pathToReact = path.resolve(__dirname, "react-ui/build", "index.html");
  console.log(pathToReact);
  res.sendFile(path.resolve(pathToReact));
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
