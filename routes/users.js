var express = require("express");
var router = express.Router();
var controllers = require("../controllers");
var bcrypt = require("bcryptjs");
var utils = require("../utils");
require("dotenv").config();

router.get("/:action", function(req, res, next) {
  var action = req.params.action;

  if (action == "logout") {
    // log out
    req.session.reset();
    res.json({
      confirm: "success"
    });
  }

  if (action == "currentuser") {
    // check for a current user
    if (req.session == null) {
      res.json({
        confirm: "success",
        message: "user not logged in"
      });
      return;
    }
    if (req.session.token == null) {
      res.json({
        confirm: "success",
        message: "user not logged in"
      });
      return;
    }
    var token = req.session.token;
    utils.JWT
      .verify(token, process.env.TOKEN_SECRET)
      .then(function(decode) {
        return controllers.user.findById(decode.id);
      })
      .then(function(user) {
        res.json({
          confirm: "success",
          user: user
        });
      })
      .catch(function(err) {
        res.json({
          confirm: "fail",
          message: "invalid token"
        });
        return;
      });
  }
});

router.post("/register", function(req, res, next) {
  var credentials = req.body;
  controllers.user
    .create(credentials)
    .then(function(user) {
      // create profile token
      var token = utils.JWT.sign({ id: user.id }, process.env.TOKEN_SECRET);
      req.session.token = token;

      res.json({
        confirm: "success",
        user: user,
        token: token
      });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err.message || err
      });
    });
});

router.post("/login", function(req, res, next) {
  var credentials = req.body;

  controllers.user
    .find({ email: credentials.email }, true)
    .then(function(profiles) {
      if (profiles.length == 0) {
        res.json({
          confirm: "fail",
          message:
            "This account does not exist on our system. Please register before you login."
        });
        return;
      }

      var profile = profiles[0];
      var passwordCorrect = bcrypt.compareSync(
        credentials.password,
        profile.password
      );
      if (passwordCorrect == false) {
        res.json({
          confirm: "fail",
          message: "incorrect password."
        });
        return;
      }
      // login success:
      // create a signed token
      var token = utils.JWT.sign({ id: profile._id }, process.env.TOKEN_SECRET);
      req.session.token = token;

      res.json({
        confirm: "success",
        profile: profile.summary(),
        token: token
      });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err
      });
    });
});

router.post("/googlelogin", function(req, res, next) {
  var credentials = req.body;

  controllers.user
    .find({ email: credentials.email }, true)
    .then(function(profiles) {
      if (profiles.length == 0) {
        res.json({
          confirm: "fail",
          message:
            "This account does not exist on our system. Please register before you login."
        });
        return;
      }

      var profile = profiles[0];

      // login success:
      // create a signed token
      var token = utils.JWT.sign({ id: profile._id }, process.env.TOKEN_SECRET);
      req.session.token = token;

      res.json({
        confirm: "success",
        profile: profile.summary(),
        token: token
      });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err
      });
    });
});

module.exports = router;
