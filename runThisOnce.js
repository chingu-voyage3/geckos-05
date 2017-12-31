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
/*
const DB_URI = process.env.MONGODB_URI;
mongoose.connect(DB_URI, { useMongoClient: true });
const db = mongoose.connection;
db.on("error", console.error
  .bind(console, "MongoDB connection error"));
*/

const projects = [];

// request
//   .get({url: `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}`, headers },
//     (err, res, body) => {
//       if (err) {
//         console.error("There was problem with your request:\n",
//           `${API_URL}/orgs/${VOYAGE_NAME}/repos${OPTIONS}\n`, err);
//       } else {
//         const json = JSON.parse(body);
//         json.forEach((data, i) => {
//           const project = projects[i] = new Project();
//           project["_id"] = uniqid();
//           project.name = data.name;
//           project.description = data.description;
//           project.repo = data.html_url;
//           project.demo = data.homepage;
//           requestStack(
//             { url: data.languages_url, headers },
//             project,
//             obj => {
//               requestContribs(
//                 { url: data.contributors_url, headers },
//                 obj,
//                 obj2 => {
//                   // console.log({
//                   //   'content-type': res.headers['content-type'],
//                   //   status: res.headers.status,
//                   //   'ratelimit': res.headers['x-ratelimit-limit'],
//                   //   'ratelimit-remaining': res.headers['x-ratelimit-remaining']
//                   // });
//                   console.log(obj2);
//                 }
//               );
//             }
//           );
//         });
//         if (res.headers.link && res.headers.link.includes('rel="next"')) {
//           console.log(res.headers.link);
//         }
//       }
//     }
//   );

getNewProjects(
  { url: REQ_URL, headers },
  projects,
  (data, proj) => {
    requestStack(
      { url: data.languages_url, headers },
      proj,
      proj => {
        requestContribs(
          { url: data.contributors_url, headers },
          proj,
          proj => {
            console.log("NEW PROJECT: " + proj);
          }
        )
      }
    )
  })

function getNewProjects(req, collection, fn) {
  request.get(req, (err, res, body) => {
    if (err) {
      console.error("There was a problem with the repos request:\n",
        req.url, err);
    } else {
      // console.log("REQ obj___", {url: REQ_URL, headers});
      // console.log("res.headers___", res.headers);
      JSON.parse(body).forEach((data, i) => {
        const project = collection[i] = new Project();
        project["_id"] = uniqid();
        project.ghId = data.id;
        project.name = data.name;
        project.description = data.description;
        project.repo = data.html_url;
        project.demo = data.homepage;
        fn(data, project);
      });
      if (res.headers.link && res.headers.link.includes('rel="next"')) {
        var link = res.headers.link
          .slice(res.headers.link.indexOf("<") + 1, res.headers.link.indexOf(">"));
        // console.log("LINK: " + link);
        var nextPage = link.match(/[^_]page=(\d)/)[1];
        if (nextPage < 6) {
          getNewProjects(
            { url: link, headers },
            collection,
            (data2, proj) => {
              requestStack(
                { url: data2.languages_url, headers },
                proj,
                proj => {
                  requestContribs(
                    { url: data2.contributors_url, headers },
                    proj,
                    proj => {
                      console.log("New Project: ", proj)
                    }
                  )
                }
              )
            }
          );
        }
        else console.log("Page traversal complete. Thank you for your time.");
      }
      else console.log("PROJECTS___\n", collection);
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
