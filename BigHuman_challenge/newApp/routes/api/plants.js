const express = require('express');
const router = express.Router(); 
const plantsController = require('../../controllers/plantsController');

// All routes with /plants come here!

// Get all plants
router.get('/', plantsController.index);
// Get one plant
router.get('/:id', plantsController.show);
// Insert a comment 
router.patch('/:id/comments', plantsController.insertComment);
// Create a plant
router.post('/', plantsController.store);
// Update a plant
router.patch('/:id', plantsController.update);
// Delete a plant
router.delete('/:id', plantsController.destroy);

module.exports = router;