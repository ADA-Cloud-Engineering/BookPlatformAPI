const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const userController  = require('../controller/userController');
const bookController  = require('../controller/bookController');

/* GET home page. */
router.post('/register', userController.handleNewUser);
router.post('/login', userController.handleLogin);
router.get('/list', bookController.list);
router.post('/upload', verifyJWT, bookController.upload);

module.exports = router;

