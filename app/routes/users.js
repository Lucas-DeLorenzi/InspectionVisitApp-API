const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');
const userExist = require('../middlewares/userExist');
const validatePassword = require('../middlewares/validPasswordBeforeHashing')

module.exports = router.get('/users', auth, UserController.getAllUsers)
    .post('/users', validatePassword, UserController.createUser)
    .put('/users/:id', auth, userExist, validatePassword, UserController.updateUser)
    .delete('/users/:id', auth, userExist, UserController.deleteUser);
