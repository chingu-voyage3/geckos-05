// local modules
const queryProjects = require("./queryProjects");
const contribsToIDs = require("./contribsToIDs");
const saveProject = require("./saveProject");

module.exports = () => queryProjects(project => {
  console.log(`${project._id}: ${project.contributors}`);
});
