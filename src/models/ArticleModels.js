const { DataTypes } = require('sequelize')
const db = require('../config/db.js');

const Articles = db.define("articles", {
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING
    },
    url_image: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    }
    }, {
        freezeTableName: true,
        timestamps: false
    });


// WARNING! KODE DI BAWAH BERFUNGSI UNTUK MEMBUAT TABLE BARU ATAU UPDATE TABLE TAPI DENGAN MENGHAPUS SEMUA VALUE YG ADA 
// db.sync({ alter: true }) // kalo mau menambahkan agar data tidak ke reset semua ganti force jadi alt: true
// .then(() => {
//     console.log(`articles synced`)
// })
// .catch((error) => console.log(`Unable to connect to databse: ${error}`));

module.exports = Articles;