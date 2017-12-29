// dependencies
const request = require("request");
const mongoose = require("mongoose");
require("dotenv").load();

// models
const Project = require("./models/projects.js");

// constants
const api_url = "http://api.github.com";
const args = process.argv;
const voyage = args[2] || "chingu-coders";
const options = args[3] && `?${args[3]}`;

// wire up database
/*
const DB_URI = process.env.MONGODB_URI;
mongoose.connect(DB_URI, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error
  .bind(console, "MongoDB connection error"));
*/

let project = {};

request.get(`${api_url}/orgs/${voyage}/repos${options}`, (err, res, body) => {
  console.log(res);
});

/*request.get(`${api_url}/orgs/${voyage}/repos${options}`)
  .pipe(data => {
    project = {
      ghId: data.id,
      name: data.name,
      description: data.description,
      repo: data.url,
      demo: data.deployments_url,
      contributors: data.contributors_url,
      tech_stack: data.languages_url
    };
    console.log(project);
  })*/
  // .pipe(request.get(`${api_url}/orgs/${voyage}/repos`));
