const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadImage');

const ObservedValuesController = require('../controllers/ObservedValuesController');
const auth = require('../middlewares/auth');
const currentVisit = require('../middlewares/currentVisit');
const observedValuesAlreadyExists = require('../middlewares/observedValuesAlreadyExists');

module.exports = router.get('/observedvalues/byvisit/:id', auth, ObservedValuesController.getObservedValuesByVisit)
    .get('/observedvalues/getcurrent', auth, currentVisit, ObservedValuesController.getObservedValuesForCurrentVisit)
    .post('/observedvalues/addnew', upload, auth, currentVisit, observedValuesAlreadyExists, ObservedValuesController.createNewObservedValues)
    .put('/observedvalues/update/:id', upload, auth, currentVisit, ObservedValuesController.updateObservedValues);