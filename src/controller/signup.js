const UserModels = require('../models/signup');

const createUser = async (req, res) => {
    const {body} = req;

    if(!body.nama_lengkap || !body.email || !body.nama_pengguna || !body.kata_sandi || !body.konfirmasi_katasandi){
        return res.status(400).json({
            message: "Data yang anda masukkan tidak lengkap",
            data: null
        })
    }

    if(body.kata_sandi !== body.konfirmasi_katasandi){
        return res.status(400).json({
            message: "Kata sandi tidak sama",
            data: null
        })
    }

    try {
        await UserModels.createNewUser(body);
        res.status(201).json({
            message:"CREATE USER success",
            data: body
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            serverMessage : error
        })
    }
}

module.exports = {
    createUser
}
