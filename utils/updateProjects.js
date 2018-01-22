// update `contributors` prop to use `_id` instead of `name`
function updateProject(project, fn) => {
  project.contributors.forEach((name, i) => {
    // query each User by name from contribs Array
    User.find({ name }, "_id", (err, result) => {
      if (err) throw new Error(err);
      else if (result) {
        // splice out name, splice in _id, pass it on to callback
        project.contributors.splice(i, 1, result);
        fn(project);
      } else console.log("huh? no user by that name?", name);
    })
  });
}

module.exports = updateProject;
