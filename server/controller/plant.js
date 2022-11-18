let express = require('express')
let router = express.Router();
let mongoose = require('mongoose');

let Plant = require('../models/plant')

module.exports.displayPlantList = (req,res,next) => {
    Plant.find((err,plantlist) => {
        if(err)
        {
            return console.error(err);
        }
        else 
        {
            res.render('plant/list',{
                title : 'Plant List', 
                Plantlist : plantlist
            })
        }
    });
};

module.exports.displayAddPage = (req,res,next) =>  {
    res.render('plant/add',{title:'Add Plant'})

};

module.exports.processAddPage = (req,res,next) =>  {
    let newPlant = Plant ({
        "name" : req.body.name,
        "age" : req.body.age,
        "price":req.body.price,
        "wateramt" :req.body.wateramt,
    });
    Plant.create(newPlant,(err,Plant) => {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/plants');
        }

    })
};

module.exports.displayEditPage = (req,res,next) =>  {
    let id = req.params.id;
    Plant.findById(id,(err,plantToEdit)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.render('plant/edit',{title:'Edit Plants',plant:plantToEdit});
        }
    })
};

module.exports.processEditPage = (req,res,next) =>  {
    let id = req.params.id;
    let updatePlant = Plant({
        "_id":id,
        "name" : req.body.name,
        "age" : req.body.age,
        "price":req.body.price,
        "wateramt" :req.body.wateramt,
    });
    Plant.updateOne({_id:id},updatePlant,(err)=> {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/plants');
        }
    })
};

module.exports.performDeletePage = (req,res,next) =>  {
    let id = req.params.id;
    Plant.deleteOne({_id:id},(err) => {
        if(err) { 
            console.log(err);
            res.end()
        }
        else 
        {
            res.redirect('/plants')
        }
    })
};

