const Plant = require('../models/plant');

// Show all plants.
module.exports.index = (req, res) => {
    Plant.find((err, docs) => {
        if (err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(docs);
    })
};

// Show one specific plant.
module.exports.show = (req, res) => {
    Plant.findById(req.params.id, {name:1, description:1, imageUrl:1, comments:1}, (err, doc) => { 
        if (err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(doc);
    });
};

// Insert a new comment for the plant. 
module.exports.insertComment = (req, res) => {
    Plant.findById(req.params.id, (err, doc) => {
        if (err) return res.status(401).json({"message":"ERROR - Unable to add comments..something went wrong!"})
        doc.comments.push({author: req.body.author, text: req.body.text});
        doc.save(err => { // You must save the parent document in order to save the sub-documents.
            if (err) res.json(err);
            else res.json('Comment successfully added for ' + doc.name + '!');
        })
    }); 
}