const express = require("express");
require('dotenv').config()
const db =  require('./src/config/db.js');
const UserRoute =  require('./src/routes/UserRoute.js');
const ContactUsRoute =  require('./src/routes/ContactUsRoute.js');
const PORT = 3600;

const app = express();

app.use(express.json())

app.use(UserRoute);
app.use(ContactUsRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

