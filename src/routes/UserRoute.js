const express = require('express');
const createNewUser = require('../controller/UserController.js')
const middleware = require('../middleware/Authentication.js');

const router = express.Router();

router.post("/signup", createNewUser.createNewUser)
router.post("/login", createNewUser.loginController)

module.exports = router;
