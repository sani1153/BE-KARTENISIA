const express = require("express");
const path = require('path');
const PORT = 3000;
require('dotenv').config()
const cors = require('cors')
const UserRoute =  require('./src/routes/UserRoute.js');
const ContactUsRoute =  require('./src/routes/ContactUsRoute.js');
// const CommentRoute = require('./src/routes/CommentRoute.js')
const ArticleRoute = require('./src/routes/ArticleRoutes.js')

const app = express();

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use('/assets', express.static('public/images'))
app.use('/external-css', express.static(path.join(__dirname, '..', '..', 'km-revo', 'capstone project 31', 'fix', 'css')));


// ROUTES
app.use(UserRoute);
app.use(ContactUsRoute);
// app.use(CommentRoute);
app.use(ArticleRoute);

//Menangani rute utama, mengarahkan ke halaman HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'km-revo', 'capstone project 31', 'fix', 'index.html'));
  });
  

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
