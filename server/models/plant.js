let mongoose = require('mongoose');
//create a plant model
let plantModel = mongoose.Schema({
    name : String,
    age : String,
    price : Number,
    wateramt : String,
    },
    {
        collections : "plantlist"
    }
)
module.exports = mongoose.model('Plant',plantModel);