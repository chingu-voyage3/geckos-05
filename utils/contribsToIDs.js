const User = require("../models/users");

// update `contributors` prop to use `_id` instead of `name`
module.exports = function contribsToIDs(project, fn) => {
  const contribs = project.contributors;
  // not using a method of Array here bc I don't want the update to go to a cb
  // contribs array should update completely before being passed to fn(project)
  for (let i = 0; i < contribs.length; i++) {
    let name = contribs[i];
    // look up _id for username at current index of contributors array
    User.findOne({ name }, "_id", (err, result) => {
      if (err) throw new Error("Error in searching for user", name, err);
      else if (result) {
        // if user found check that the _id is not already in the contribs array
        if (!contribs.includes(result._id)) {
          // if _id not already in array, splice out username, insert _id
          contribs.splice(i, 1, result._id);
        }
        // if the _id is already in the array, splice out username, insert nothing
        else contribs.splice(i, 1);
      }
      // if user not found, that makes no sense. log a warning
      else console.warn("Huh? No user by that name?", name);
    });
  }
  // once contribs array is all updated, pass project to cb
  fn(project);
}
