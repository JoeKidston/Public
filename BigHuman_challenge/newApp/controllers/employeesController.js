const Employee = require('../models/employee');

// Add a new employee
module.exports.store = (req, res) => {
    const newEmployee = new Employee();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.pwd = req.body.password;
    newEmployee.favouritePlant = "undecided";
    newEmployee.save(err => {
        if (err) return res.status(401).json({"message":"ERROR - Unable to add this employee at this time."})
        else return res.status(201).send('New employee "' + newEmployee.name + '" successfully added.');
    });
}