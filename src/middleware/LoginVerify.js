function verifyToken(req, res, next) {
    // Dapatkan header Authorization
    const bearerHeader = req.headers['authorization'];
  
    // Cek apakah Authorization header terdefinisi
    if (typeof bearerHeader !== 'undefined') {
      // Ambil token dari header
      const bearerToken = bearerHeader.split(' ')[1];
  
      // Verifikasi token menggunakan secret key
      jwt.verify(bearerToken, secretKey, (err, decoded) => {
        if (err) {
          res.sendStatus(403); // Token tidak valid
        } else {
          // Token valid, data pengguna tersimpan dalam decoded
          req.users = decoded;
          next();
        }
      });
    } else {
      // Authorization header tidak terdefinisi
      res.sendStatus(401); // Unauthorized
    }
  }

module.exports = verifyToken;