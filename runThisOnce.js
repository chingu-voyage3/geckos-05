// dependencies
const request = require("request");
const mongoose = require("mongoose");
require("dotenv").load();

// models
const Project = require("./models/projects.js");

// constants
const API_URL = "https://api.github.com";
const ARGS = process.argv.slice(2);
const USER_AGENT = "ckingbailey";
// it annoys me that I have to filter repeatedly here
// let's try to figure out another succinct way to do this assignment
const VOYAGE_NAME = ARGS.filter(arg => {
    return !arg.includes("=")
  }).join("") || "chingu-coders";
const OPTIONS = ARGS.filter(arg => {
    return arg.includes("=")
  }).join("") && "?" + ARGS.filter(arg => {
    return arg.includes("=");
  }).join("&");

// wire up database
/*
const DB_URI = process.env.MONGODB_URI;
mongoose.connect(DB_URI, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error
  .bind(console, "MongoDB connection error"));
*/

let project = {};

request.get(
  { url: `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`,
    headers: {
      'User-Agent': "ckingbailey"
    }
  }, (err, res, body) => {
  const json = JSON.parse(body);
  project = {
    name: json.name,
    description: json.description,
    repo: json.html_url,
  };
  console.log(`${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`);
  console.log(json);
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
