const express = require('express');
const createNewUser = require('../controller/UserController.js')
const verify = require('../middleware/LogoutVerify.js');
const verifyToken = require('../middleware/LoginVerify.js');

const router = express.Router();

router.post("/signup", createNewUser.createNewUser)
router.post("/login", createNewUser.createNewUser)
router.post("api/user", verifyToken, (req, res) => {
    res.json({ userData: req.userData });
})

router.get("/users", createNewUser.getUsers)
router.post("/logout", verify, createNewUser.logoutController)
router.get('/user/:id', createNewUser.getUserById)



module.exports = router;
