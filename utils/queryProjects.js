// find all projects
function queryProjects(model, query, fn) {
  // test for presence of args
  if (typeof query === "object") {
    model.find(query, (err, projects) => {
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
    model.find((err, projects) => {
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
