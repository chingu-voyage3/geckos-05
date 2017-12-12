"use strict"

// dependencies
const express = require("express");

// env vars
const PORT = process.env.API_PORT || 3001;

// modules of dependencies
const app = express();
const router = express.Router();

// dummy db results for testing
const fake_projects = [
  { name: "My Project",
    description: "We made a thing!",
    team: "Squids-23",
    cohort: "Summer 2017",
    repo: "/squids-23/my_project",
    stack: ["React", "JQuery"],
    categories: ["landing page", "original"],
    uniqueID: "1111111aaaaa" },
  { name: "My Project 2",
    description: "We made another thing!",
    team: "Nutrias-66",
    cohort: "Fall 2017",
    repo: "/Chingu-cohorts/Nutrias-66/project_2",
    stack: ["Vue", "D3"],
    categories: ["Chrome extension", "Momentum clone", "Github API", "original"],
    uniqueID: "1111112bbbbb" },
  { name: "My Project III",
    description: "We made a third thing!",
    team: "Pigeons-54",
    cohort: "Winter 2017",
    repo: "/Chingu-Voyage3/Pigeons-54/project_iii",
    stack: ["Angular", "Express", "PostgreSQL", "Slack API"],
    categories: ["full-stack", "bot", "Slack bot", "clone"],
    uniqueID: "1111113ccccc" },
]

router.route("/projects")
  .get((req, res) => {
    console.log("You've reached the '/projects' route. Please leave a message and we'll call you back");
    res.json({ fake_projects })
  })

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
