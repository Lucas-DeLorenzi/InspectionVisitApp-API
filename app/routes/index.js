const express = require('express');
const router = express.Router();
const allowCors = require('../middlewares/allowCors')

const usersRouter = require('./users')
const authRouter = require('./auth')
const visitsRouter = require('./visits')
const observedValuesRouter = require('./observedValues')


router.use('/', allowCors, usersRouter);
router.use('/', allowCors, authRouter);
router.use('/', allowCors, visitsRouter);
router.use('/', allowCors, observedValuesRouter);

module.exports = router;