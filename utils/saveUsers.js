// if isNewUser, userObj is a new record
// if !isNewUser, userObj is an update to an existing record
function saveUser(userObj, isNewUser) {
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
