let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

//connect with plant model
let Plant = require('../models/plant')
let plantController = require('../controller/plant')

//READ OPERATION 
router.get('/',plantController.displayPlantList)

//ADD OPERATION (GET)
router.get('/add',plantController.displayAddPage)

//ADD OPERATION (POST)
router.post('/add',plantController.processAddPage)

//EDIT OPERATION (GET)
router.get('/edit/:id',plantController.displayEditPage)
//(POST)
router.post('/edit/:id',plantController.processEditPage)

//DELEETE OPERATION 
router.get('/delete/:id',plantController.performDeletePage)

module.exports = router;