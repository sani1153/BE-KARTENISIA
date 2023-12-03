const express = require('express');
const ContactUsController =  require('../controller/contactus')

const router = express.Router();

// CREATE - POST
router.post('/', ContactUsController.ContactUs);

module.exports = router;