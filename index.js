const express = require("express");
require('dotenv').config()
const db =  require('./src/config/db.js');
const UserRoute =  require('./src/routes/UserRoute.js');
const ContactUsRoute =  require('./src/routes/ContactUsRoute.js');
const CommentRoute = require('./src/routes/CommentRoute.js')
const PORT = 3600;

const app = express();

// MIDDLEWARE
app.use(express.json())
app.use('/assets', express.static('public/images'))

// ROUTES
app.use(UserRoute);
app.use(ContactUsRoute);
app.use(CommentRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

