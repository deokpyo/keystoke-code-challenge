var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET test page. */
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'User Test' });
});

module.exports = router;
