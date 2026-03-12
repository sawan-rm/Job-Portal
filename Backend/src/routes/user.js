const express = require('express');
const {login, register, logout, updateProfile} = require('../controller/auth');
const isAuthenticate =require('../middleware/isAuthenticated');
const singleUpload = require('../middleware/multer');

const router = express.Router();

router.post('/register',singleUpload, register);
router.post('/login', login);
router.get('/logout', logout);
router.put('/updateProfile',isAuthenticate, updateProfile);

module.exports = router;