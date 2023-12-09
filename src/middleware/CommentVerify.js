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

module.exports = verifyToken;
