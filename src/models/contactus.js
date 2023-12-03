const dbPool = require('../config/database');

const ContactUs = (body) => {
    const SQLQuery = `INSERT INTO contactus (name, email, nomor_hp, message) VALUES ('${body.name}', '${body.email}', '${body.nomor_hp}', '${body.message}')`;

    return dbPool.execute(SQLQuery)
}

module.exports = {
    ContactUs
}