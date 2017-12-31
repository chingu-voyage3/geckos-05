// dependencies
const mongoose = require("mongoose");
const request = require("request");
const uniqid = require("uniqid");
require("dotenv").load();

// database models
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

const projects = [];

request
  .get({url: `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`,
        headers: { 'User-Agent': "ckingbailey" }
    }, (err, res, body) => {
      if (err) {
        console.error("There was problem with your request:\n",
          `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}\n`, err);
      } else {
        console.log(res.headers["content-type"]);
        const json = JSON.parse(body);
        json.forEach((obj, i) => {
          const project = projects[i] = new Project();
          // project["_id"] = uniqid();
          project.name = obj.name;
          project.description = obj.description;
          project.repo = obj.html_url;
        })
        console.log(projects);
      }
    });

function requestStack(url, collection, fn) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "stack" request\n',
        `${url}\n`, err);
    } else {
      fn(collection.map(obj => {
        obj.tech_stack = Object.keys(JSON.parse(body));
        return obj;
      }));
    }
  });
}

function requestContribs(url, collection, fn) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "contribs" request\n',
        `${url}\n`, err);
    } else {
      fn(collection.map(obj => {
        obj.contributors = JSON.parse(body).map(contrib => {
          return contrib.login;
        });
        return obj;
      }));
    }
  });
}

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
