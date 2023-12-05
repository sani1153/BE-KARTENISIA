const { DataTypes } = require('sequelize')
const db = require('../config/db.js')

const User = db.define("user", {
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
});

// db.sync({ force: true })
//   .then(() => {
//     console.log(`user synced`)
//   })
//   .catch((error) => console.log(`Unable to connect to databse: ${error}`));
  
module.exports = User;
