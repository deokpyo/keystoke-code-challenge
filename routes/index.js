var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET test page. */
router.get('/google08bf4dee2ce1be38.html', function(req, res, next) {
  res.render('gogole', null);
});

module.exports = router;
