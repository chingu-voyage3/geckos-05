// needs DB connection in addition to this Project model
const Project = require("../models/project");

// if existing project, update it
// if new project, save it
module.exports = function saveProject(project) {
  // search for existing project
  Project.findOne({ ghId: project.ghId }, (qryErr, result) => {
    if (qryErr) throw new Error("There was a problem querying database for project", project, qryErr);
    else if (result) {
      result.update(project, (updateErr, raw) => {
        if (updateErr) throw new Error("There was a problem updating the project record", updateErr);
        else console.log("Project", result.ghId, "successfully updated", raw);
      })
    }
    // if no result, this is a new project: save it
    else project.save((saveErr, newProject) => {
      if (saveErr) throw new Error("There was a problem saving new project", project, saveErr);
      else console.log("New project saved", newProject);
    })
  });
}
