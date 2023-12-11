const express = require('express');
const SendMessage = require('../controller/ContactUsController')

const router = express.Router();

// POST MESSAGE
router.post("/contact-us", SendMessage.SendMessage)
// GET ALL MESSAGE
router.get("/messages", SendMessage.getMessage)

module.exports = router;
