const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Dapatkan header Authorization dari request
    const bearerHeader = req.headers['authorization'];
  
    // Periksa apakah header Authorization terdefinisi
    if (typeof bearerHeader !== 'undefined') {
      // Ambil token dari header Authorization
      const bearerToken = bearerHeader.split(' ')[1];
  
      // Verifikasi token menggunakan secret key
      jwt.verify(bearerToken, JWT_SECRET, (err, decoded) => {
        if (err) {
          res.sendStatus(403); // Token tidak valid
        } else {
          // Token valid, data pengguna tersimpan dalam decoded
          req.userData = decoded; // Menyimpan data pengguna pada request untuk digunakan oleh endpoint
          next(); // Lanjutkan ke middleware atau endpoint berikutnya
        }
      });
    } else {
      res.sendStatus(401); // Unauthorized jika header Authorization tidak terdefinisi
    }
  }

module.exports=verifyToken;