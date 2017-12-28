// dependencies
const request = require("request");
const mongoose = require("mongoose");


// models
const Project = require("./models/projects.js");
const User = require("./models/users.js");

// constants
const api_url = "http://api.github.com";
const args = process.argv;
const voyage = process.argv[2] || "chingu-coders";

function getProjects() {
  request.get(`${api_url}/orgs/${voyage}/repos`)
    .then(res => {
      if (res.status !== ok) {
        throw Error(`${res.status}: ${res.message}`);
      } else {
        res.json()
      }
    })
    .then(json => {
      // map object data to new data record
    })
}
