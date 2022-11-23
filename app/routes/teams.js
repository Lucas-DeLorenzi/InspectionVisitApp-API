const express = require('express');
const router = express.Router();

const TeamController = require('../controllers/TeamController');
const auth = require('../middlewares/auth');

module.exports = router.get('/teams', auth, TeamController.getAllTeams)
