const { DataTypes } = require('sequelize')
const db = require('../config/db.js')

const User = db.define("users", {
  user_id: {
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
  password: {
    type: DataTypes.STRING,
  },
  confirm_password: {
    type: DataTypes.STRING,
  }
  }, {
    freezeTableName: true,
  });

// WARNING! KODE DI BAWAH BERFUNGSI UNTUK MEMBUAT TABLE BARU ATAU UPDATE TABLE TAPI DENGAN MENGHAPUS SEMUA VALUE YG ADA 
// db.sync({ alter: true }) // kalo mau menambahkan agar data tidak ke reset semua ganti force jadi alt: true
// .then(() => {
//   console.log(`user synced`)
// })
// .catch((error) => console.log(`Unable to connect to databse: ${error}`));
  
module.exports = User;
