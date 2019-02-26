const express = require('express'); 
const router = express.Router(); 
const employeesController = require('../../controllers/employeesController');

// All routes with /employees come here!

// Add an employee
router.post('/register', employeesController.store);

module.exports = router;