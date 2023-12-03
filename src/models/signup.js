const dbPool = require('../config/database');

const createNewUser = (body) => {
    const SQLQuery = `INSERT INTO signup (nama_lengkap, email, nama_pengguna, kata_sandi, konfirmasi_katasandi) VALUES ('${body.nama_lengkap}', '${body.email}', '${body.nama_pengguna}', '${body.kata_sandi}', '${body.konfirmasi_katasandi}')`;

    return dbPool.execute(SQLQuery)
}

module.exports = {
    createNewUser
}