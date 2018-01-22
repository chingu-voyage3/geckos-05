const Project = require("../models/projects");

// find all projects
module.exports = function queryProjects(query, fn) {
  // test for presence of args
  if (typeof query === "object") {
    // for all projects for query parameters
    Project.find(query, (err, projects) => {
      if (err) {
        console.error(err);
      }
      else {
      // iterate over each project, passing it to callback
        console.log("num of projects", projects.length);
        projects.forEach(project => {
          fn(project);
        })
      }
    });
  }
  // if `query` omitted, set `fn` to `query`
  else if (typeof query === "function") {
    fn = query;
    // find all projects
    Project.find((err, projects) => {
      if (err) {
        console.error(err);
      }
      else {
      // iterate over each project, passing it to callback
        console.log("num of projects", projects.length);
        projects.forEach(project => {
          fn(project);
        })
      }
    });
  }
}
