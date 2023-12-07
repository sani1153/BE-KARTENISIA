const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')

const createNewUser = async (req, res) => {
    const {body} = req;

    if(!body.username || !body.email || !body.password || !body.confirm_password){
        return res.status(400).json({
            message: "Data yang anda masukkan tidak lengkap",
            data: null
        })
    }

    if(body.confirm_password !== body.password){
      return res.status(400).json({
          message: "Password tidak sama",
          data: null
      })
    }

    const foundEmails = await User.findAll({
      where: {
        email: body.email // Menemukan semua entri dengan email yang cocok
      }
    });
    
    // Periksa jika ada email yang sudah terdaftar
    if (foundEmails.length > 0) {
      return res.status(400).json({
        message: "Email sudah terdaftar",
        data: null
      });
    }

    try {
      const saltRounds = 10;
      // Hash password menggunakan bcrypt
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      
      // Simpan data pengguna ke database, termasuk password yang sudah di-hash
      const userData = {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      };
      
      const data = await User.create(userData);
    
        res.status(201).send({ 
            msg: "Create New User Success",
            data: body 
        });
      } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
      }
}

const loginController = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Cari pengguna berdasarkan email
      const user = await User.findOne({ where: { email } });
  
      // Jika pengguna tidak ditemukan
      if (!user) {
        return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
      }
  
      // Bandingkan password yang dimasukkan dengan password di database
      const passwordMatch = await bcrypt.compare(password, user.password);
      
  
      // Jika password tidak cocok
      if (!passwordMatch) {
        return res.status(401).json({ 
            message: 'Password salah',
            data : user.password 
        });
      }

      if(passwordMatch){
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });
        // Jika email dan password cocok, user berhasil login
        res.status(200).json({ message: 'Login berhasil', user, token });
      }
  
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Terjadi kesalahan saat login' });
    }
}

module.exports = {
    createNewUser,
    loginController
}



