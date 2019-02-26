const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    "name": {type:String, required:true},
    "email": {type:String, required:true},
    "pwd": {type:String, required:true},
    "favouritePlant": String
});

module.exports = mongoose.model('Employee', EmployeeSchema);