// db models
const Voyage = require("../models/voyages.js");

module.exports = function createVoyages() {
  const dates = [ "Summer 2017", "Fall 2017", "Winter 2017" ];
  for (let i = 1; i <= 3; i++) {
    const voyage = new Voyage();
    voyage.number = i;
    voyage.date = dates[i - 1];
    voyage.save((err, newVoyage) => {
      if (err) throw new Error("Error in saving new voyage", err);
      else console.log("New voyages successfully saved", newVoyage);
    })
  }
}
