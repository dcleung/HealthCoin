var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Health' , balance: '0', error: null});
});

module.exports = router;
