// dependencies
const btoa = require("btoa");
const mongoose = require("mongoose");
const request = require("request");
const uniqid = require("uniqid");
require("dotenv").load();

// database models
const Project = require("./models/projects.js");

// constants
const API_URL = "https://api.github.com";
const GH_LOGIN = process.env.GH_LOGIN + ":" + process.env.GH_TOKEN;
const ARGS = process.argv.slice(2);
const USER_AGENT = "ckingbailey";
const VOYAGE_NAME = ARGS.filter(arg => {
    return !arg.includes("=")
  }).join("") || "chingu-coders";
const OPTIONS = ARGS.filter(arg => {
    return arg.includes("=")
  }).join("") && "?" + ARGS.filter(arg => {
    return arg.includes("=");
  }).join("&");
const REQ_URL = `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`;
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

getNewProjects(
  { url: REQ_URL, headers },
  (data, project) => {
    requestStack(
      { url: data.languages_url, headers },
      project,
      project => {
        requestContribs(
          { url: data.contributors_url, headers },
          project,
          project => {
            project.save((err, newRecord) => {
              if (err) {
                console.error("Error in saving db record: ", err);
              }
              else console.log("Project successfully saved: ", newRecord);
            });
          }
        )
      }
    )
  })

function getNewProjects(req, fn) {
  request.get(req, (err, res, body) => {
    if (err) {
      console.error("There was a problem with the repos request:\n",
        req.url, err);
    } else {
      // console.log("REQ obj___", {url: REQ_URL, headers});
      // console.log("res.headers___", res.headers);
      JSON.parse(body).forEach((data, i) => {
        Project.findOne({ ghId: data.id }, function(err, result) {
          if (err) {
            console.error("Error in search for existing project record", err);
          } else if (result) {
            console.log("Existing project record: ", result);
          } else {
            const project = new Project();
            project["_id"] = uniqid();
            project.ghId = data.id;
            project.name = data.name;
            project.description = data.description;
            project.repo = data.html_url;
            project.demo = data.homepage;
            fn(data, project);
          }
        });
      });
      if (res.headers.link && res.headers.link.includes('rel="next"')) {
        var links = parseLinkHeader(res.headers.link)
        // var nextPage = link.match(/[^_]page=(\d)/)[1];
        // if (nextPage > 1) {
        getNewProjects(
          { url: links.next, headers },
          (data2, proj) => {
            requestStack(
              { url: data2.languages_url, headers },
              proj,
              proj => {
                requestContribs(
                  { url: data2.contributors_url, headers },
                  proj,
                  proj => {
                    proj.save((err, newRecord) => {
                      if (err) {
                        console.error("Error in saving db record: ", err);
                      }
                      else console.log("Project successfully saved: ", newRecord);
                    });
                  }
                )
              }
            )
          }
        );
        // }
        // else console.log("Page traversal complete. Thank you for your time.");
      }
      else console.log("That's it: just the one page");
    }
  })
}

function requestStack(req, obj, fn) {
  request.get(req, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "stack" request\n',
        req, err);
    } else {
      obj.tech_stack = Object.keys(JSON.parse(body));
      fn(obj);
    }
  });
}

function requestContribs(req, obj, fn) {
  request.get(req, (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "contribs" request\n',
        req, err);
    } else {
      obj.contributors = JSON.parse(body).map(contrib => {
        return contrib.login;
      });
      fn(obj);
    }
  });
}

function parseLinkHeader(header) {
  if (header.length === 0) {
    throw new Error('"link header" input must not be of zero length');
  }
  // split parts at commas
  const parts = header.split(",");
  const linksList = {};
  // parse each part into a named link
  parts.forEach(part => {
    const section = part.split(";");
    if (section.length !== 2) {
      throw new Error('link header section could not be split on ";"');
    }
    const url = section[0].replace(/<(.*)>/, "$1").trim();
    const name = section[1].replace(/rel="(.*)"/, "$1").trim();
    linksList[name] = url;
  });
  return linksList;
}
