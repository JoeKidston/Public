const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = require('./comment'); 

const PlantSchema = new Schema({
    "name": {type:String, required:true},
    "description": {type:String, required:true},
    "imageUrl": {type:String, required:true},
    "comments": [CommentSchema]
});

module.exports = mongoose.model('Plant', PlantSchema);