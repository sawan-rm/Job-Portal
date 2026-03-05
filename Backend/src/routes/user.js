const express = require('express');
const {login, register, logout, updateProfile} = require('../controller/auth');
const isAuthenticate =require('../middleware/isAuthenticated')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/updateProfile',isAuthenticate, updateProfile);

module.exports = router;