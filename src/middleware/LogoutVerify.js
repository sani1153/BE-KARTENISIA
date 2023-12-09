const jwt = require('jsonwebtoken');

function verifyTokenLogout(req, res, next) {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'Token not provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
  
      req.userId = decoded.id; // Menyimpan ID pengguna ke dalam objek request
      next();
    });
  }

module.exports = verifyTokenLogout;