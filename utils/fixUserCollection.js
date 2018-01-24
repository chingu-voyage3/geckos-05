// local modules
const queryProjects = require("./queryProjects");
const contribsToIDs = require("./contribsToIDs");
const saveProject = require("./saveProject");

module.exports = () => queryProjects({ voyage: 2}, project => {
  contribsToIDs(project, project => {
    console.log(`${project.repo}: ${project.contributors}`);
  })
});
