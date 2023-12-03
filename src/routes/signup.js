const express = require('express');
const userController =  require('../controller/signup.js')

const router = express.Router();

// CREATE - POST
router.post('/', userController.createUser);

module.exports = router;