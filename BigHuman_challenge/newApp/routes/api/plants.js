const express = require('express');
const router = express.Router(); 
const plantsController = require('../../controllers/plantsController');

// Get all plants
router.get('/', plantsController.index);
// Get one plant
router.get('/:id', plantsController.show);
// Insert a comment into a plant's sub-documents
router.patch('/:id/comments', plantsController.insertComment);

module.exports = router;