const User = require("../models/users");

// update `contributors` prop to use `_id` instead of `name`
module.exports = function contribsToIDs(project, fn) {
  project.contributors.forEach((name, i, contribs) => {
    // look up _id for current username in contributors array
    User.findOne({ name }, "_id", (err, result) => {
      if (err) throw new Error("Error in searching for user", name, err);
      // if user found, check that the _id is not already in the contribs array
      else if (result) {
        // if _id not already in array, splice out username, insert _id
        if (!contribs.includes(result._id)) {
          contribs.splice(i, 1, result._id);
        }
        // if the _id is already in the array, splice out username, insert nothing
        else contribs.splice(i, 1);
      }
      // if user not found, something's fishy. log a warning
      else console.warn("Huh? No user by that name?", name);
      // pass to callback on each iteration
      fn(project);
    });
  });
}
