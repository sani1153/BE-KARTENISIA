const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Token tidak valid' });
      }
      req.user_id = decoded.id; // Mendapatkan id dari token
      next();
    });
  } else {
    return res.status(401).json({ message: 'Tidak ada token yang disediakan' });
  }
}
// const jwt = require('jsonwebtoken');
// const User = require('../models/UserModel');

// const authenticateUser = async (req, res, next) => {
//   try {
//     let token = req.headers['authorization'].split(" ")[1];
//     let decoded = jwt.verify(token, process.env.SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ "msg": "Could not authenticate" });
//   }
// };

// const getUserDetails = async (req, res, next) => {
//   try {
//     let user = await User.findOne({
//       where: { id: req.user.id },
//       attributes: { exclude: ["password"] }
//     });
//     if (user === null) {
//       res.status(404).json({ 'msg': "User not found" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ 'msg': "Internal Server Error" });
//   }
// };

// module.exports = {
//   authenticateUser,
//   getUserDetails
// };

module.exports = verifyToken;