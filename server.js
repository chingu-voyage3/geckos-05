"use strict"

// dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const router = express.Router();

// models
const Project = require("./models/projects.js");

// load example data hardcoded in local file
// const DATA = require("./react-ui/src/data.js");

// load local env vars only in development env
if (process.env.NODE_ENV !== "production") {
  require('dotenv').load()
}

// env vars
const PORT = process.env.NODE_ENV !== "production" ?
  (process.env.API_PORT || 3001) : process.env.PORT;
const MONGO_URI = process.env.MONGODB_URI;

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
app.use(express.static(path.resolve(__dirname, "react-ui/build")));

router.get("/", (req, res) => {
  res.send("api initialized")
})

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
