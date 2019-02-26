const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// All routes with /auth come here!

// Check if hashes match
router.post('/check', authController.compareHashes);
// Check if credentials match
router.post('/', authController.checkAuth);

module.exports = router;