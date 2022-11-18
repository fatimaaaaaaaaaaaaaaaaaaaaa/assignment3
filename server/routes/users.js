var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('This is a user page');
});

module.exports = router;
