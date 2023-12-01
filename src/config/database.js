const mysql = require('mysql2');

const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
});

module.exports = dbPool.promise(); //Karena Async maka menggunakan promise()