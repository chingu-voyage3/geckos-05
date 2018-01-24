// dependencies
const btoa = require("btoa");
const mongoose = require("mongoose");
const request = require("request");
// const uniqid = require("uniqid");
require("dotenv").load();

// database models
const Project = require("../models/projects.js");

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

let firstTime = true;

getNewProjects(
  { url: REQ_URL, headers },
  (data, project) => {
    requestStack(
      data,
      project,
      project => {
        requestContribs(
          data,
          project,
          project => {
            project.save((err, newRecord) => {
              if (err) {
                console.error("Error in saving db record: ", err);
              }
              else {
                console.log("Project successfully saved: ", newRecord);
              }
            });
          }
        )
      }
    )
  });

function getNewProjects(req, fn) {
  request.get(req, (err, res, body) => {
    if (err) {
      console.error("There was a problem with the repos request:\n",
        req.url, err);
    } else {
      JSON.parse(body).forEach((data, i) => {
        // check for existing project
        Project.findOne({ ghId: data.id }, function(err, result) {
          if (err) {
            console.error("Error in search for existing project record", err);
          } else if (result) {
            // check for presence of `voyage` props
            // if no `voyage` prop, update it by parsing repo url
            if (!result.voyage) {
              console.log("Project record is missing voyage", result);
              const voyage = result.repo.includes("chingu-coders" || "Voyage2" || "voyage2") ?
                2 : result.repo.includes("Voyage3") ?
                  3 : 0;
              result.update({ voyage }, (err, raw) => {
                if (err) {
                  console.error("Error in updating project", err, result);
                } else console.log("project updated", raw);
              });
            } else console.log("Existing project record: ", result.ghId);
          }
          // if no existing project, intantiate a new one
          else {
            const project = new Project();
            const voyageNum = data.url.includes("chingu-voyage3") ?
              3 : data.url.includes("chingu-coders" || "Voyage2" || "voyage2") ?
                2 : 0;
            project.ghId = data.id;
            project.name = data.name;
            project.description = data.description;
            project.repo = data.html_url;
            project.demo = data.homepage;
            project.voyage = voyageNum;
            data.reqHeaders = req.headers;
            fn(data, project);
          }
        });
      });
      // traverse pages of results
      if (res.headers.link && res.headers.link.includes('rel="next"')) {
        var links = parseLinkHeader(res.headers.link);
        // if (links.next < 1) {
        getNewProjects(
          { url: links.next, headers: req.headers },
          (data2, proj) => {
            requestStack(
              data2,
              proj,
              proj => {
                requestContribs(
                  data2,
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

// data should be the complete gh response
// obj should be an instance of the Project model
// fn receives obj as argument
function requestStack(data, obj, fn) {
  request.get({ url: data.languages_url, headers: data.reqHeaders },
    (err, res, body) => {
    if (err) {
      console.error('There was a problem with the "stack" request\n',
        { url: data.languages_url, headers: data.reqHeaders }, err);
    } else if (res.statusCode === 200) {
      if (!Object.keys(JSON.parse(body)).length) {
        // if empty languages then do another request to see if repo is empty
        console.log("The languages object came back empty:",
          "Checking for empty repo...", data.languages_url);
        var itIsEmpty = isItEmpty(data);
        if (itIsEmpty) {
          console.error("Yup, we seem to have an empty repo",
            `${data.html_url}: ${itIsEmpty}`);
          return;
        } else {
          // if size & contents come back ok, proceed without languages prop
          console.log("Languages is empty but repo seems to have contents.",
            `${data.html_url}, size: ${data.size}`, "Proceeding as normal.");
          obj.tech_stack = Object.keys(JSON.parse(body));
          fn(obj);
        }
      } else {
        // if response is okay and has content
        // then add it to object and pass it along to next callback
        obj.tech_stack = Object.keys(JSON.parse(body));
        fn(obj);
      }
    } else {
      console.error("The response to languages request was not OK:",
        res.statusCode + ": " + res.headers.statusMessage);
      return;
    }
  });
}

function requestContribs(data, obj, fn) {
  request.get({ url: data.contributors_url, headers: data.reqHeaders },
    (err, res, body) => {
    if (err) {
      console.error('There was a problem in the "contribs" request\n',
        { url: data.contributors_url, headers: data.reqHeaders }, err);
    } else {
      if (res.statusCode === 200) {
        if (res.headers["content-type"].includes("application/json")) {
          var json = JSON.parse(body);
          if (!json.length) {
            // if empty contribs, do more requests to see if repo is empty
            console.error("We seem to have an empty contributors array:",
              "Checking for empty repo...", data.contributors_url);
            var itIsEmpty = isItEmpty(data);
            if (itIsEmpty) {
              console.error("Yup, we seem to have an empty repo.",
                `${data.html_url}: ${itIsEmpty}`);
              return;
            } else {
            // if size and content exist but there are no contributors
            // well, that just doesn't make sense
            // stop here and log the results
              console.log("There appears to be content but no contributors",
                "That just doesn't make sense", data.html_url);
              return;
            }
          } else {
            obj.contributors = json.map(contrib => {
              return contrib.login;
            });
            fn(obj);
          }
        } else {
        // response is not json? we don't know what to do with that
        // return and log results
          console.log("The response came back in an unexpected format: ",
            data.contributors_url, res.headers["content-type"])
        }
      } else if (res.statusCode === 204) {
        // if no contribs obj, do another request to see if repo is empty
        console.log("There's nothin here for ye, mate --->",
          data.contributors_url,
          "This repo may be empty");
        var itIsEmpty = isItEmpty(data);
        if (itIsEmpty) {
          console.error("Yup, we seem to have an empty repo",
            data.html_url, itIsEmpty);
          return;
        } else {
          console.log("Repo has data but no contributors.",
            "That just doesn't make sense", data.html_url);
        }
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        console.error("Github has a problem with us:",
          `${res.statusCode}: ${res.statusMessage}, ${data.contributors_url}`);
      } else console.log("didn't getcher content? maybe we goofed. look at the code, ckb!",
          `${data.contributors_url}, ${res.statusCode}: ${res.statusMessage}`);
    }
  });
}

// if this function returns something, the repo is empty
// stop processing data and return nothing from calling fcn
function isItEmpty(data) {
  // first, check how much data is in repo
  if (!+data.size) {
    return "Repo size is a big 000:";
  } else {
  // if data is in repo, check what repo contents are
    request.get({ url: data.contents_url, headers: data.reqHeaders},
      (err, res, body) => {
      if (err) {
        return "There was a problem with requesting repo contents " +
          data.contents_url;
      } else if (res.statusCode === 200) {
        if (res.headers["content-type"] === "application/json") {
          if (JSON.parse(body).message === "This repository is empty.") {
            return "There's no project here: " + data.html_url;
          } else if (!Object.keys(JSON.parse(body)).length) {
            return "The response body is empty " + data.contents_url;
          } else {
          // if contents response is json and has length > 0, should be all good
          // proceed as normal
            return;
          }
        } else return `Response came back in unexpected format: ${data.contents_url} ${res.headers["content-type"]}`;
      } else if (res.statusCode >= 400 && res.statusCode < 500) {
        return `There was a problem with the response ${data.contents_url}, ${res.statusCode}: ${res.statusMessage}`;
      } else return "The response to repo contents request was not OK: " +
          `${res.statusCode}: ${res.statusMessage} ` +
          `${res.headers["content-type"]} ${data.contents_url}`;
    });
  }
}

function parseLinkHeader(header) {
  if (!header || header.length === 0) {
    console.error('"link header" input must not be of zero length');
    return null;
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
