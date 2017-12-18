"use strict"

// dependencies
const express = require("express");

// load example data hardcoded in local file
const DATA = require("./react-ui/src/data.js");

// load local env vars only in development env
if (process.env.NODE_ENV !== "production") {
  require('dotenv').load()
}

// env vars
const PORT = process.env.NODE_ENV !== "production" ?
  process.env.API_PORT : process.env.PORT;

// modules of dependencies
const app = express();
const router = express.Router();

// allow any origin for any route
app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
})

// tutorial says "Priority serve any static files"
// does this not do the same as get("*", callback => sendFile("<react-stuff>"))?
app.use(express.static("/react-ui/build"));

// CRUD methods for projects api
router.route("/projects")
  .get((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send({ projects: DATA });
  })

app.use("/api", router);

app.get("*", (req, res) => {
  res.sendFile("/react-ui/build/index.html");
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
