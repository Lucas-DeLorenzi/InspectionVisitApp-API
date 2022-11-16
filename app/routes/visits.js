const express = require('express');
const router = express.Router();

const VisitController = require('../controllers/VisitController');
const auth = require('../middlewares/auth');
const activeVisitByCurrentUser = require('../middlewares/activeVisitByCurrentUser');

module.exports = router.get('/visits', auth, VisitController.getAllVisits)
    .get('/visits/getcurrent/:id', auth, VisitController.getCurrentVisit)
    .post('/visits/addnew', auth, activeVisitByCurrentUser, VisitController.createNewVisit)
    .put('/visits/finish', auth, VisitController.finishVisit);