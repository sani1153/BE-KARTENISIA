const { DataTypes } = require('sequelize')
const db = require('../config/db.js');
const User = require('./UserModel.js');

const Comment = db.define("comment", {
    comment_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'user_id',
      },
    },
    likes_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
});


// WARNING! KODE DI BAWAH BERFUNGSI UNTUK MEMBUAT TABLE BARU ATAU UPDATE TABLE TAPI DENGAN MENGHAPUS SEMUA VALUE YG ADA 
// db.sync({ force: true })
// .then(() => {
//     console.log(`comment synced`)
// })
// .catch((error) => console.log(`Unable to connect to databse: ${error}`));

module.exports = Comment;