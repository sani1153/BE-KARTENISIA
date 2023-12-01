require('dotenv').config();
const PORT = process.env.PORT;

const express = require('express');
const usersRoutes = require('./routes/users');
const middlewareLog = require('./middleware/logs');

const app = express();

// MIDDLEWARE
app.use(middlewareLog);
app.use(express.json());

// ROUTES
app.use('/users', usersRoutes);

// DbPool

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})