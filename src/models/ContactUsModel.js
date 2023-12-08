const { DataTypes } = require('sequelize')
const db = require('../config/db.js')

const ContactUs = db.define("contact_us", {
    contact_us_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone_number: {
      type: DataTypes.STRING(15), 
    },
    message: {
      type: DataTypes.TEXT,
    }
    }, {
    freezeTableName: true,
    });

// WARNING! KODE DI BAWAH BERFUNGSI UNTUK MEMBUAT TABLE BARU ATAU UPDATE TABLE TAPI DENGAN MENGHAPUS SEMUA VALUE YG ADA 
db.sync({ alter: true }) // kalo mau menambahkan agar data tidak ke reset semua ganti force jadi alt: true
.then(() => {
    console.log(`contact_us synced`)
})
.catch((error) => console.log(`Unable to connect to databse: ${error}`));

module.exports = ContactUs;