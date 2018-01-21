// find all projects
function queryProjects(model, query, fn) {
  // test for presence of args
  if (typeof query === "object") {
    model.find(query, (err, projects) => {
      if (err) {
        console.error(err);
      }
      else {
      // iterate over each project, passing its gh contributors api url to callback
        console.log("num of projects", projects.length);
        projects.forEach(proj => {
        // replace repo url with gh api url for repo
          const api_url = proj.repo.replace("https://github.com", "https://api.github.com/repos");
        // also pass project _id to cb
          fn(api_url, proj._id);
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
      // iterate over each project, passing its gh contributors api url to callback
        console.log("num of projects", projects.length);
        projects.forEach(proj => {
        // replace repo url with gh api url for repo
          const api_url = proj.repo.replace("https://github.com", "https://api.github.com/repos") + "/contributors";
        // also pass project _id to cb
          fn(api_url, proj._id);
        })
      }
    });
  }
}
