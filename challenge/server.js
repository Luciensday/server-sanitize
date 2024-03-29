const express = require("express");
const { home } = require("./templates.js");

const server = express();

const posts = [];

server.get("/", (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.post("/", express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const errorsObject = {};

  if (!nickname) {
    errorsObject.nickname = "please enter your nickname";
  }

  if (!message) {
    errorsObject.message = "please enter a message";
  }

  if (Object.keys(errorsObject).length > 0) {
    const errorBody = home(posts, errorsObject, req.body);
    res.status(400).send(errorBody);
  } else {
    const created = Date.now();
    posts.push({ nickname, message, created });
    res.redirect("/");
  }
});

module.exports = server;
