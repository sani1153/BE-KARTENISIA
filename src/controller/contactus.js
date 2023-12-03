const ContactModels = require('../models/contactus');

const ContactUs = async (req, res) => {
    const {body} = req;

    if(!body.name || !body.email || !body.nomor_hp || !body.message){
        return res.status(400).json({
            message: "Data yang anda masukkan tidak lengkap",
            data: null
        })
    }

    try {
        await ContactModels.ContactUs(body);
        res.status(201).json({
            message:"Send Message Success",
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
    ContactUs
}
