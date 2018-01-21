// query all Projects
// iterate over them, querying each User in the `contributors` prop
// upadte `contributors` prop to use `_id` instead of `name`

// this is not actually how queryProject works
// but it provides a reasonably good model for what I need to get done here
queryProjects(Project, (url, projectId) => {
  project.forEach(proj => {
    proj.contributors.forEach(name => {
      User.find({ name }, "_id", (err, result) => {
        if (err) throw new Error(err);
        else if (result) {
          project.contributors.splice(project.contributors.indexOf(name), 1, result);
        } else console.log("huh? no user by that name?", user)
      })
    })
  })
})
