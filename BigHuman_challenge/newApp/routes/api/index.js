const express = require('express'); 
const router = express.Router(); 
const employeesRouter = require('./api/employees');
const plantsRouter = require('./api/plants');
const authRouter = require('./api/auth');

router.get('/', (req, res) => {
    res.send('Welcome to Joe\'s plant API!')
});

router.use('/auth', authRouter);
router.use('/employees', employeesRouter);
router.use('/plants', plantsRouter);

module.exports = router;