const express = require('express');
const createNewUser = require('../controller/UserController.js')
const verify = require('../middleware/LogoutVerify.js');
const verify2 = require('../middleware/LoginVerify.js');

const router = express.Router();

router.post("/signup", createNewUser.createNewUser)
router.post("/login", createNewUser.loginController)
router.get("/users", createNewUser.getUsers)
router.post("/logout", verify, createNewUser.logoutController)
router.get('/user/:id', createNewUser.getUserById)



module.exports = router;
