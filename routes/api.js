var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

router.get("/:resource", function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirm: "fail",
      message: "invalid resource"
    });
    return;
  }

  controller
    .find(req.query, false)
    .then(function(data) {
      res.json({
        confirm: "success",
        results: data
      });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: err
      });
    });
});

router.get("/:resource/:id", function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirm: "fail",
      message: "invalid resource"
    });
    return;
  }

  var id = req.params.id;
  controller
    .findById(id)
    .then(function(result) {
      res.json({
        confirm: "success",
        results: result
      });
    })
    .catch(function(err) {
      res.json({
        confirm: "fail",
        message: "resource:" + resource + " id:" + id + " | not found"
      });
    });
});

router.post("/:resource", function(req, res, next) {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller == null) {
    res.json({
      confirm: "fail",
      message: "invalid resource"
    });
    return;
  }
  controller
    .create(req.body)
    .then(function(result) {
      res.json({
        confirm: "success",
        results: result
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
