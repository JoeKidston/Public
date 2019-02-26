const utils = require('../utils'); // This holds JWT generator
const Employee = require('../models/employee');

// Controller actions 
module.exports.compareHashes = (req, res) => {
    console.log('er')
    Employee.find({email:req.body.email}, (err, doc) => {
        if(err) return res.status(401).json({"message":"ERROR - SOMETHING WENT WRONG!"})
        if(doc.length === 0) { // If no records returned...
            return res.status(401).json({
                "message":"Email and/or password incorrect. Try again!"
            });
        }
        res.json({
            "password":doc[0].pwd
        });
    })
}

module.exports.checkAuth = (req, res) => { // NOTE: This will be a post
    Employee.find({email:req.body.email}, (err, doc) => {
        if(err) return res.status(401).json({"message":"ERROR - SOMETHING WENT WRONG!"})
        if(doc.length === 0) { // If no records returned...
            return res.status(401).json({
                "message":"Email and/or password incorrect. Try again!"
            });
        }
        // Employee is validated, now generate them a token
        const token = utils.generateJWT(doc[0].name, req.body.email);
        res.status(200).json({
            "access_allowed":true,
            "token":token
        })
    })
}