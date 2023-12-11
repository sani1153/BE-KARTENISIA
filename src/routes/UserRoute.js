const express = require('express');
const createNewUser = require('../controller/UserController.js')

const router = express.Router();

// CREAT NEW USER
router.post("/signup", createNewUser.createNewUser)
// LOGIN USER
router.post("/login", createNewUser.loginController)
// LOGOUT
router.post("/logout", createNewUser.logoutController)
// GET ALL USERS 
router.get("/users", createNewUser.getUsers)
// GET USER BY ID
router.get('/user/:id', createNewUser.getUserById)

module.exports = router;
