const { Sequelize } = require('sequelize')

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  timezone: '+07:00', // Sesuaikan dengan zona waktu yang diinginkan (Asia/Jakarta)
  dialectOptions: {
    timezone: '+07:00', // Jika diperlukan, sesuaikan dengan zona waktu yang diinginkan
  }
});

module.exports = db;
