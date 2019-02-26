const express = require('express'); 
const router = express.Router(); 
const employeesRouter = require('./employees');
const plantsRouter = require('./plants');
const authRouter = require('./auth');

// All routes with /api come here!

router.get('/', (req, res) => {
    res.send('Welcome to Joe\'s plant API!')
});

router.use('/auth', authRouter);
router.use('/employees', employeesRouter);
router.use('/plants', plantsRouter);

module.exports = router;