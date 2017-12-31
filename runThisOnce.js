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
const headers = {
  "User-Agent": "ckingbailey",
  "username": "ckingbailey"
}

// requestContribs(
//   { url: "https://api.github.com/repos/chingu-coders/paypal-otters/contributors",
//     headers },
//    {},
//    obj => {
//      console.log(obj);
//    });

request
  .get({url: `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`,
        headers }, (err, res, body) => {
      if (err) {
        console.error("There was problem with your request:\n",
          `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}\n`, err);
      } else {
        console.log(res.headers["content-type"]);
        const json = JSON.parse(body);
        json.forEach((data, i) => {
          const project = projects[i] = new Project();
          // project["_id"] = uniqid();
          project.name = data.name;
          project.description = data.description;
          project.repo = data.html_url;
          requestStack(
            { url: data.languages_url, headers },
            project,
            obj => {
              requestContribs(
                { url: data.contributors_url, headers },
                obj,
                obj2 => {
                  console.log(obj2);
                }
              );
            }
          );
        });
      }
  });

function requestStack(url, obj, fn) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "stack" request\n',
        `${url}\n`, err);
    } else {
      obj.tech_stack = Object.keys(JSON.parse(body));
      fn(obj);
    }
  });
}

function requestContribs(url, obj, fn) {
  request.get(url, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "contribs" request\n',
        `${url}\n`, err);
    } else {
      obj.contributors = JSON.parse(body).map(contrib => {
        return contrib.login;
      });
      fn(obj);
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
