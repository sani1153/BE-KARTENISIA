const express = require("express");
const PORT = 3600;
require('dotenv').config()
const cors = require('cors')
const UserRoute =  require('./src/routes/UserRoute.js');
const ContactUsRoute =  require('./src/routes/ContactUsRoute.js');
const CommentRoute = require('./src/routes/CommentRoute.js')
const ArticleRoute = require('./src/routes/ArticleRoutes.js')

const app = express();

// MIDDLEWARE
app.use(cors())
app.use(express.json())
// app.use('/assets', express.static('public/images'))

// ROUTES
app.use(UserRoute);
app.use(ContactUsRoute);
app.use(CommentRoute);
app.use(ArticleRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

