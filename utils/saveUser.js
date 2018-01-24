const User = require("../models/users");

// if isNewUser, userObj is a new record
// if !isNewUser, userObj is an update to an existing record
module.exports = function saveUser(userObj) {
  // using find one bc I trust that users aren't initially duplicated
  User.findOne({ userObj.ghId }, (err, result) => {
    if (err) throw new Error("Error in searching for existing user record", userObj.name, err);
    // if user already exists, test various props for currency and update them in needed
    else if (result) {
      // if ghId is already in db consider ghId canonical
      // overwrite userObj._id with extant _id
      if (userObj._id !== result._id) {
        userObj._id = result._id;
      }
      // if userObj has projects array
      // check for matching project _ids in result.projects & userObj.projects
      else if (userObj.projects) {
        if (result.projects.length <=1) {
          // if both arrays contain 1 or fewer elements simply compare them
          // concat them if they are unique
          if (userObj.projects.length <=1 &&
            userObj.projects[0] !== result.projects[0]) {
            userObj.projects = userObj.projects.concat(result.projects);
          }
          // if userObj.projects contains more than one value
          // check whether the element in result.projects is not in userObj.projects
          // if it is not found, concat them
          else if (!userObj.projects.includes(result.projects[0])) {
            userObj.projects = userObj.projects.concat(result.projects);
          }
        }
        // if result.projects contains more than one value
        // and userObj.projects contains one or fewer values
        else if (userObj.projects.length <=1 &&
          !res.projects.includes(userObj.projects[0])) {
          userObj.projects = userObj.projects.concat(result.projects);
        }
        // if result.projects contains more than one value
        // and userObj.projects contains more than one value
        // we need to iterate over both arrays to check for dupes
        else {
          let i = 0;
          // I'll be honest this while loop makes me nervous
          // I'm going to throw in a eject button for now
          let j = 0;
          while (i < userObj.projects.length && j < 10) {
            // if duplicate found in userObj.projects then splice it out
            // decreasing userObj.projects.length by 1
            // and check the value now at the index i
            if (result.projects.includes(userObj.projects[i])) {
              userObj.projects.splice(i, 1);
            }
            // if no duplicate found increment i and look at next index
            else i++;
            // in case loop is running long, eject after 10 iterations
            j++
          }
        }
      }
      result.update(userObj, (updateErr, raw) => {
        if (updateErr) throw new Error("Error updating user record", userObj.name, updateErr);
        else console.log("User record updated", userObj.name, raw);
      });
    }
    // if no query result, save as new user
    else {
      userObj.save((saveErr, newUserRecord) => {
        if (saveErr) throw new Error("Error saving new user", userObj.name, saveErr);
        else console.log("New user saved", newUserRecord.name);
      });
    }
  });
}
