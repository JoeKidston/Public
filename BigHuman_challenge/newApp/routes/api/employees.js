const express = require('express'); 
const router = express.Router(); 
const employeesController = require('../../../controllers/employeesController');

// Add an employee
router.post('/register', employeesController.store);

module.exports = router;