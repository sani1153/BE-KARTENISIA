const express = require('express');
const SendMessage = require('../controller/ContactUsController')

const router = express.Router();

router.post("/contact-us", SendMessage.SendMessage)

module.exports = router;
