const express = require('express');
const {login, register, logout, updateProfile} = require('../controller/auth');
const isAuthenticate =require('../middleware/isAuthenticated')

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/updateProfile',isAuthenticate, updateProfile);

module.exports = router;