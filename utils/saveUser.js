// if isNewUser, userObj is a new record
// if !isNewUser, userObj is an update to an existing record
module.exports = function saveUser(userObj, isNewUser) {
  // this fn should do its own query for User to determine whether its new or already exists
  if (isNewUser) {
    userObj.save((err, newUserRecord) => {
      if (err) {
        console.error(err);
      }
      else console.log("user record created:\n", newUserRecord);
    });
  } else userObj.update(userObj, (err, raw) => {
    if (err) console.error(err);
    else console.log("user record updated:\n", raw);
  });
}
