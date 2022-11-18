let express = require('express');
let router = express.Router();
let indexController = require('../controller/index');
//home page

router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

module.exports = router;
