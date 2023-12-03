require('dotenv').config();
const express = require('express');
const middlewareLog = require('./src/middleware/logs');
const usersRoutes = require('./src/routes/users');
const signupRoutes = require('./src/routes/signup')
const contactUsRoutes = require('./src/routes/contactus')
const app = express();
const PORT = process.env.PORT;

// MIDDLEWARE
app.use(middlewareLog);
app.use(express.json());

// ROUTES
app.use('/users', usersRoutes);
app.use('/signup', signupRoutes);
app.use('/contactus', contactUsRoutes);

// DbPool

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});