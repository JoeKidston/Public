const Plant = require('../models/plant');

// Show all plants.
module.exports.index = (req, res) => {
    Plant.find((err, docs) => {
        if(err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(docs);
    })
};

// Show one specific plant.
module.exports.show = (req, res) => {
    Plant.findById(req.params.id, {name:1, description:1, imageUrl:1, comments:1}, (err, doc) => { 
        if(err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(doc);
    });
};

// Insert a new comment for the plant. 
module.exports.insertComment = (req, res) => {
    Plant.findById(req.params.id, (err, doc) => {
        if(err) return res.status(401).json({"message":"ERROR - Unable to add comments..something went wrong!"})
        doc.comments.push({author: req.body.author, text: req.body.text});
        doc.save(err => { // Save the parent document in order to save the sub-documents
            if (err) res.json({"message":"ERROR - Something went wrong!"});
            else res.json('Comment successfully added for ' + doc.name + '!');
        })
    }); 
}

// Add a new plant
module.exports.store = (req, res) => {
    const newPlant = new Plant();
    newPlant.name = req.body.name;
    newPlant.description = req.body.description;
    newPlant.imageUrl = req.body.imageUrl;
    newPlant.comments = req.body.comments;
    newPlant.save(err => {
        if(err) res.status(400).json({"message":"ERROR - Something went wrong!"});
        else res.status(201).send('Plant ' + req.body.name + ' successfully added.');
    });
}

// Edit one plant
module.exports.update = (req, res) => {
    Plant.findByIdAndUpdate(req.params.id, {'$set': {name: req.body.name, description: req.body.description, imageUrl: req.body.imageUrl, comments: req.body.comments}}, (err, doc) => {
        if(err) res.json({"message":"ERROR - Something went wrong!"});
        else res.send('Plant ' + req.params.name + ' successfully updated!')})
}

// Delete a plant.
module.exports.destroy = (req, res) => {
    Plant.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err) res.json({"message":"ERROR - Something went wrong!"});
        res.send('Plant deleted!')})
}