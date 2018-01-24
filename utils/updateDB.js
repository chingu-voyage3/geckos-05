// dependencies
const btoa = require("btoa");
const mongoose = require("mongoose");
const request = require("request");
const uniqid = require("uniqid");
require("dotenv").load();

// GH api call constants
const API_URL = "https://api.github.com";
const GH_LOGIN = process.env.GH_LOGIN + ":" + process.env.GH_TOKEN;
const USER_AGENT = "ckingbailey";
const headers = {
  "User-Agent": "ckingbailey",
  Authorization: "Basic " + btoa(GH_LOGIN)
};

// command line arguments
const ARGS = process.argv.slice(2);

// wire up database
const DB_URI = process.env.MONGODB_URI;
// MERN tutorial uses { useMongoClient: true } here but mongoose says unsupported
mongoose.connect(DB_URI, err => {
  if (err) throw new Error(err);
});
const db = mongoose.connection;
// I got this 'bind' from MERN tutorial. what does it do?
db.on("error", console.error
  .bind(console, "MongoDB connection error"));

// globals
let counter = 0;

// require and invoke local module all in one step
// require("./fixUserCollection")();
require("./createVoyages")();
