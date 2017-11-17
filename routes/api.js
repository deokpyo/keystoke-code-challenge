var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

// GET route
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

// PUT route to update by id
router.put("/:resource/:id", function(req, res, next) {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];

  if (controller == null) {
    res.json({
      confirm: "fail",
      message: "invalid resource"
    });
    return;
  }

  controller
    .update(id, req.body)
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

module.exports = router;
