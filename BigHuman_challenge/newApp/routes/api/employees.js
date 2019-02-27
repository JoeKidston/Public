const express = require('express'); 
const router = express.Router(); 
const employeesController = require('../../controllers/employeesController');

// All routes with /employees come here!

// Get all employees
router.get('/', employeesController.index);
// Get one employee
router.get('/:id', employeesController.show);
// Add an employee
router.post('/register', employeesController.store);
// Update an employee
router.patch('/:id', employeesController.update);
// Delete an employee
router.delete('/:id', employeesController.destroy);

module.exports = router;