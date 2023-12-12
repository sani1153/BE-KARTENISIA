const express = require("express");
const cors = require('cors')
require('dotenv').config()
const PORT = 3600;

const UserRoute =  require('./src/routes/UserRoute.js');
const ContactUsRoute =  require('./src/routes/ContactUsRoute.js');
const ArticleRoute = require('./src/routes/ArticleRoutes.js')

const app = express();

// MIDDLEWARE
app.use(cors())
app.use(express.json())

// ROUTES
app.use(UserRoute);
app.use(ContactUsRoute);
app.use(ArticleRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

