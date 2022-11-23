const express = require('express');
const router = express.Router();

const usersRouter = require('./users')
const authRouter = require('./auth')
const visitsRouter = require('./visits')
const observedValuesRouter = require('./observedValues')
const teamsRouter = require('./teams')


router.use('/', usersRouter);
router.use('/', authRouter);
router.use('/', visitsRouter);
router.use('/', observedValuesRouter);
router.use('/', teamsRouter);

module.exports = router;