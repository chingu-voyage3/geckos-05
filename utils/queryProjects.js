const Project = require("../models/projects.js");

// find all projects
module.exports = function queryProjects(Project, query, fn) {
  // test for presence of args
  if (typeof query === "object") {
    Project.find(query, (err, projects) => {
      if (err) {
        console.error(err);
      }
      else {
      // iterate over each project, passing it to callback
        console.log("num of projects", projects.length);
        projects.forEach(proj => {
          fn(proj);
        })
      }
    });
  }
  // if `query` omitted, set `fn` to `query`
  else if (typeof query === "function") {
    fn = query;
    Project.find((err, projects) => {
      if (err) {
        console.error(err);
      }
      else {
      // iterate over each project, passing it to callback
        console.log("num of projects", projects.length);
        projects.forEach(proj => {
          fn(proj);
        })
      }
    });
  }
}
