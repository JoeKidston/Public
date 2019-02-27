const Employee = require('../models/employee');

// Show all employees
module.exports.index = (req, res) => {
    Employee.find((err, docs) => {
        if(err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(docs);
    })
};

// Show one specific employee
module.exports.show = (req, res) => {
    Employee.findById(req.params.id, {name:1, email:1, favouritePlant:1}, (err, doc) => { 
        if(err) return res.status(401).json({"message":"ERROR - Something went wrong!"})
        return res.json(doc);
    });
};

// Add a new employee
module.exports.store = (req, res) => {
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.pwd = req.body.password;
    newEmployee.favouritePlant = "undecided";
    newEmployee.save(err => { // Save the parent document in order to save the sub-documents
        if (err) return res.status(401).json({"message":"ERROR - Unable to add this employee at this time."})
        else return res.status(201).send('New employee "' + newEmployee.name + '" successfully added.');
    });
}

// Edit an employee
module.exports.update = (req, res) => {
    Employee.findByIdAndUpdate(req.params.id, {'$set': {name: req.body.name, email: req.body.email, favouritePlant: req.body.favouritePlant}}, (err, doc) => {
        if(err) res.json({"message":"ERROR - Something went wrong!"});
        else res.send('Employee ' + req.params.name + ' successfully updated!')})
}

// Delete an employee
module.exports.destroy = (req, res) => {
    Employee.findByIdAndDelete(req.params.id, (err, doc) => {
        if(err) res.json({"message":"ERROR - Something went wrong!"});
        res.send('Employee record deleted!')})
}